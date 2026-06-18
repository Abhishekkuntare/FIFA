"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group, Mesh } from "three"

type Props = {
  position?: [number, number, number]
  scale?: number
  orbit?: boolean
}

// A spinning, bouncing classic football (icosahedron base for the panel look).
export function Football({ position = [0, 0, 0], scale = 1, orbit = false }: Props) {
  const group = useRef<Group>(null)
  const ball = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ball.current) {
      ball.current.rotation.y = t * 0.9
      ball.current.rotation.x = t * 0.35
    }
    if (group.current) {
      if (orbit) {
        group.current.position.x = position[0] + Math.cos(t * 0.5) * 2.4
        group.current.position.z = position[2] + Math.sin(t * 0.5) * 2.4
      }
      group.current.position.y = position[1] + Math.abs(Math.sin(t * 1.6)) * 0.35
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh ref={ball} castShadow>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.35}
          metalness={0.1}
          flatShading
        />
      </mesh>
      {/* subtle dark panel wireframe accent */}
      <mesh scale={1.001}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshBasicMaterial color="#0b0d12" wireframe />
      </mesh>
    </group>
  )
}
