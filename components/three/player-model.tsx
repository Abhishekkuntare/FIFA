"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import type { Nation } from "@/lib/nations"

type Props = {
  nation: Nation
  /** external rotation control (radians) for drag */
  rotationY?: number
  animate?: boolean
}

// A stylized, "figurine" footballer built from primitive geometry.
// Kit colors come from the selected nation.
export function PlayerModel({ nation, rotationY = 0, animate = true }: Props) {
  const root = useRef<Group>(null)
  const lArm = useRef<Group>(null)
  const rArm = useRef<Group>(null)
  const lLeg = useRef<Group>(null)
  const rLeg = useRef<Group>(null)

  const skin = "#c89a6a"
  const jersey = nation.primary
  const shorts = nation.secondary === "#ffffff" ? nation.primary : nation.secondary
  const trim = nation.accent
  const socks = nation.primary

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (root.current) {
      // idle breathing + soft bob, plus external drag rotation
      root.current.rotation.y = rotationY + (animate ? Math.sin(t * 0.4) * 0.08 : 0)
      root.current.position.y = animate ? Math.sin(t * 1.4) * 0.03 : 0
    }
    if (animate) {
      const sway = Math.sin(t * 1.4)
      if (lArm.current) lArm.current.rotation.x = sway * 0.18
      if (rArm.current) rArm.current.rotation.x = -sway * 0.18
      if (lLeg.current) lLeg.current.rotation.x = sway * 0.06
      if (rLeg.current) rLeg.current.rotation.x = -sway * 0.06
    }
  })

  return (
    <group ref={root} position={[0, 0, 0]} scale={1}>
      {/* Head */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>
      {/* Hair cap */}
      <mesh position={[0, 1.72, -0.02]} castShadow>
        <sphereGeometry args={[0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#2a2118" roughness={0.8} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Torso / jersey */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <capsuleGeometry args={[0.27, 0.5, 8, 24]} />
        <meshStandardMaterial color={jersey} roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Jersey trim collar */}
      <mesh position={[0, 1.34, 0.02]}>
        <torusGeometry args={[0.16, 0.03, 12, 32]} />
        <meshStandardMaterial color={trim} roughness={0.4} emissive={trim} emissiveIntensity={0.12} />
      </mesh>
      {/* Number patch on chest */}
      <mesh position={[0, 1.12, 0.27]}>
        <circleGeometry args={[0.11, 24]} />
        <meshStandardMaterial color={trim} roughness={0.4} emissive={trim} emissiveIntensity={0.25} />
      </mesh>

      {/* Arms */}
      <group ref={lArm} position={[-0.32, 1.28, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.42, 8, 16]} />
          <meshStandardMaterial color={jersey} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.6} />
        </mesh>
      </group>
      <group ref={rArm} position={[0.32, 1.28, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.42, 8, 16]} />
          <meshStandardMaterial color={jersey} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.6} />
        </mesh>
      </group>

      {/* Shorts */}
      <mesh position={[0, 0.66, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.12, 8, 24]} />
        <meshStandardMaterial color={shorts} roughness={0.5} />
      </mesh>

      {/* Legs */}
      <group ref={lLeg} position={[-0.13, 0.55, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.42, 8, 16]} />
          <meshStandardMaterial color={skin} roughness={0.6} />
        </mesh>
        {/* sock */}
        <mesh position={[0, -0.58, 0]}>
          <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
          <meshStandardMaterial color={socks} roughness={0.5} />
        </mesh>
        {/* boot */}
        <mesh position={[0, -0.74, 0.06]} castShadow>
          <boxGeometry args={[0.13, 0.1, 0.28]} />
          <meshStandardMaterial color="#101317" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>
      <group ref={rLeg} position={[0.13, 0.55, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.42, 8, 16]} />
          <meshStandardMaterial color={skin} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.58, 0]}>
          <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
          <meshStandardMaterial color={socks} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.74, 0.06]} castShadow>
          <boxGeometry args={[0.13, 0.1, 0.28]} />
          <meshStandardMaterial color="#101317" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>
    </group>
  )
}
