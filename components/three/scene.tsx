"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, ContactShadows, Float } from "@react-three/drei"
import * as THREE from "three"
import type { Nation } from "@/lib/nations"
import { PlayerModel } from "./player-model"
import { Football } from "./football"
import { Stadium } from "./stadium"
import { Particles } from "./particles"

export type ViewMode = "hero" | "players" | "stadium"

type Props = {
  nation: Nation
  view: ViewMode
  tint: string
  playerRotation: number
}

const CAMERA_TARGETS: Record<ViewMode, { pos: [number, number, number]; look: [number, number, number] }> = {
  hero: { pos: [0, 2.2, 9], look: [0, 1, 0] },
  players: { pos: [0.2, 1.5, 5], look: [0, 1, 0] },
  stadium: { pos: [0, 7.5, 17], look: [0, 1.5, 0] },
}

function CameraRig({ view }: { view: ViewMode }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 1, 0))

  useFrame((state, delta) => {
    const t = CAMERA_TARGETS[view]
    const drift = view === "hero" ? Math.sin(state.clock.elapsedTime * 0.15) * 0.8 : 0
    const desired = new THREE.Vector3(t.pos[0] + drift, t.pos[1], t.pos[2])
    camera.position.lerp(desired, 1 - Math.pow(0.001, delta))
    target.current.lerp(new THREE.Vector3(...t.look), 1 - Math.pow(0.001, delta))
    camera.lookAt(target.current)
  })
  return null
}

export function Scene({ nation, view, tint, playerRotation }: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 2.2, 9], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0a0e14"]} />
      <fog attach="fog" args={["#0a0e14", 18, 42]} />

      <CameraRig view={view} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <hemisphereLight intensity={0.5} groundColor="#0a0e14" />
      <directionalLight
        position={[6, 12, 6]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <spotLight
        position={[-8, 10, -6]}
        angle={0.5}
        penumbra={0.8}
        intensity={2}
        color={tint}
      />
      <pointLight position={[0, 3, 4]} intensity={1.2} color={tint} distance={14} />

      <Suspense fallback={null}>
        <Stadium tint={tint} crowd={view !== "players"} />

        {/* Hero & player figure */}
        <group position={[0, 0, 0]}>
          <PlayerModel
            nation={nation}
            rotationY={playerRotation}
            animate
          />
        </group>

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          <Football position={[1.7, 0.6, 1.2]} scale={0.9} />
        </Float>
        {view === "hero" && (
          <Football position={[-2.2, 0.5, 0.5]} scale={0.7} orbit />
        )}

        <Particles count={view === "stadium" ? 500 : 320} color={tint} />

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.5}
          scale={14}
          blur={2.4}
          far={6}
        />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
