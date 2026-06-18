"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type Props = {
  tint?: string
  crowd?: boolean
}

// A stylized stadium: pitch, surrounding tiered stands made of instanced "seats",
// floodlight pylons, and a glowing rim. Built procedurally for performance.
export function Stadium({ tint = "#22d3ee", crowd = true }: Props) {
  const crowdRef = useRef<THREE.InstancedMesh>(null)
  const count = 2400

  const { matrices, colors } = useMemo(() => {
    const dummy = new THREE.Object3D()
    const matrices: THREE.Matrix4[] = []
    const colors: THREE.Color[] = []
    const palette = ["#e2e8f0", "#94a3b8", "#cbd5e1", tint, "#f8fafc"]
    const rings = 8
    for (let r = 0; r < rings; r++) {
      const radiusX = 9 + r * 0.85
      const radiusZ = 6.5 + r * 0.7
      const y = 1 + r * 0.55
      const perRing = Math.floor(count / rings)
      for (let i = 0; i < perRing; i++) {
        const a = (i / perRing) * Math.PI * 2
        const x = Math.cos(a) * radiusX
        const z = Math.sin(a) * radiusZ
        dummy.position.set(x, y, z)
        dummy.scale.setScalar(0.12 + Math.random() * 0.05)
        dummy.rotation.set(0, -a, 0)
        dummy.updateMatrix()
        matrices.push(dummy.matrix.clone())
        const c = new THREE.Color(
          palette[Math.floor(Math.random() * palette.length)],
        )
        colors.push(c)
      }
    }
    return { matrices, colors }
  }, [tint])

  useFrame((state) => {
    if (!crowdRef.current || !crowd) return
    const t = state.clock.elapsedTime
    const dummy = new THREE.Object3D()
    for (let i = 0; i < matrices.length; i++) {
      matrices[i].decompose(dummy.position, dummy.quaternion, dummy.scale)
      // crowd shimmer / wave
      const wave = Math.sin(t * 2 + dummy.position.x * 0.3 + dummy.position.z * 0.2)
      dummy.position.y += wave * 0.015
      dummy.updateMatrix()
      crowdRef.current.setMatrixAt(i, dummy.matrix)
    }
    crowdRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      {/* Pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 11]} />
        <meshStandardMaterial color="#14532d" roughness={0.95} />
      </mesh>
      {/* Mowing stripes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-7 + i * 2, 0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[1, 11]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#166534" : "#15803d"}
            roughness={0.95}
          />
        </mesh>
      ))}
      {/* Center circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.4, 1.5, 48]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.7} />
      </mesh>
      {/* Pitch outline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0, 0.12, 24]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>

      {/* Stands base ring (the bowl) */}
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[15, 9.5, 6, 64, 1, true]} />
        <meshStandardMaterial
          color="#0b1220"
          side={THREE.BackSide}
          roughness={0.9}
        />
      </mesh>

      {/* Glowing rim */}
      <mesh position={[0, 5.4, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[14.6, 0.12, 16, 80]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {/* Crowd */}
      {crowd && (
        <instancedMesh
          ref={crowdRef}
          args={[undefined, undefined, matrices.length]}
          frustumCulled={false}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial vertexColors roughness={0.8} />
          <Colors colors={colors} />
        </instancedMesh>
      )}

      {/* Floodlight pylons */}
      {[
        [13, 0, 9],
        [-13, 0, 9],
        [13, 0, -9],
        [-13, 0, -9],
      ].map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 8, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 8.2, 0]}>
            <boxGeometry args={[1.6, 0.9, 0.3]} />
            <meshStandardMaterial
              color="#f8fafc"
              emissive="#dbeafe"
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Helper that assigns instanced colors after mount.
function Colors({ colors }: { colors: THREE.Color[] }) {
  const ref = useRef<THREE.InstancedBufferAttribute>(null)
  const array = useMemo(() => {
    const arr = new Float32Array(colors.length * 3)
    colors.forEach((c, i) => {
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    })
    return arr
  }, [colors])
  return (
    <instancedBufferAttribute
      ref={ref}
      attach="instanceColor"
      args={[array, 3]}
    />
  )
}
