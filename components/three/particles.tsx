"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type Props = {
  count?: number
  color?: string
  radius?: number
}

// Floating glowing dust / spark particles drifting upward.
export function Particles({ count = 600, color = "#22d3ee", radius = 22 }: Props) {
  const ref = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * radius * 2
      positions[i * 3 + 1] = Math.random() * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 2
      speeds[i] = 0.2 + Math.random() * 0.8
    }
    return { positions, speeds }
  }, [count, radius])

  useFrame((_, delta) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.6
      if (arr[i * 3 + 1] > 18) arr[i * 3 + 1] = 0
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
