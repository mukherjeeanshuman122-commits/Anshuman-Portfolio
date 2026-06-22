import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Bone({ start, end, thickness = 0.03 }) {
  const ref = useRef()
  const [midpoint, length, rotation] = useMemo(() => {
    const s = new THREE.Vector3(...start)
    const e = new THREE.Vector3(...end)
    const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5)
    const len = s.distanceTo(e)
    const dir = new THREE.Vector3().subVectors(e, s).normalize()
    const up = new THREE.Vector3(0, 1, 0)
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dir)
    return [mid, len, quat]
  }, [start, end])

  return (
    <group position={midpoint} quaternion={rotation}>
      <mesh>
        <cylinderGeometry args={[thickness, thickness * 0.82, length, 6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  )
}

function Joint({ position, size = 0.04 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color="#ffffff" roughness={0.45} metalness={0.05} />
    </mesh>
  )
}

function Skull({ eyeGlow }) {
  return (
    <group position={[0, 1.72, 0]}>
      <mesh>
        <sphereGeometry args={[0.12, 16, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.06, 0.06]}>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[-0.04, 0.02, 0.1]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} emissive="#6366f1" emissiveIntensity={eyeGlow * 0.6} />
      </mesh>
      <mesh position={[0.04, 0.02, 0.1]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} emissive="#6366f1" emissiveIntensity={eyeGlow * 0.6} />
      </mesh>
      <mesh position={[0, -0.02, 0.11]}>
        <boxGeometry args={[0.03, 0.02, 0.02]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.09, 0.02]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.06, 0.05, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  )
}

function Ribcage() {
  const ribs = useMemo(() => {
    const result = []
    for (let i = 0; i < 7; i++) {
      const y = 1.4 - i * 0.055
      const width = 0.14 - Math.abs(i - 3) * 0.012
      const curve = 0.08 + i * 0.004
      result.push({ y, width, curve })
    }
    return result
  }, [])

  return (
    <group>
      {ribs.map((rib, i) => (
        <group key={i}>
          <mesh position={[-rib.width / 2, rib.y, rib.curve / 2]} rotation={[0, 0, 0.3]}>
            <torusGeometry args={[rib.width / 2, 0.011, 4, 14, Math.PI]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.05} />
          </mesh>
          <mesh position={[rib.width / 2, rib.y, rib.curve / 2]} rotation={[0, Math.PI, 0.3]}>
            <torusGeometry args={[rib.width / 2, 0.011, 4, 14, Math.PI]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.05} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 1.44, 0]}>
        <boxGeometry args={[0.03, 0.06, 0.03]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  )
}

function FingerBones(side) {
  const x = side === 'left' ? -1 : 1
  const base = [x * 0.4, 1.05, 0.1]
  return (
    <group>
      {[0, 1, 2, 3].map((fi) => {
        const angle = (fi - 1.5) * 0.15
        const tipX = base[0] + Math.sin(angle) * 0.04 * x
        const tipY = base[1] - 0.04
        const tipZ = base[2] + 0.02
        return (
          <group key={fi}>
            <Bone start={base} end={[tipX, tipY, tipZ]} thickness={0.006} />
            <Bone start={[tipX, tipY, tipZ]} end={[tipX + Math.sin(angle) * 0.025 * x, tipY - 0.03, tipZ + 0.01]} thickness={0.004} />
          </group>
        )
      })}
    </group>
  )
}

export default function SkeletonModel() {
  const groupRef = useRef()
  const eyeRef = useRef(0)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.25
    groupRef.current.position.y = -0.8 + Math.sin(t * 0.35) * 0.04
    eyeRef.current = 0.3 + Math.sin(t * 0.8) * 0.3
  })

  const spineJoints = useMemo(() => {
    const joints = []
    for (let i = 0; i < 14; i++) {
      joints.push([0, 1.5 - i * 0.065, 0])
    }
    return joints
  }, [])

  return (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={1.4}>
      <Skull eyeGlow={0.5} />
      <Bone start={[0, 1.65, 0]} end={[0, 1.5, 0]} thickness={0.025} />
      {spineJoints.slice(0, -1).map((pos, i) => (
        <Bone key={`spine-${i}`} start={spineJoints[i]} end={spineJoints[i + 1]} thickness={0.018} />
      ))}
      {spineJoints.map((pos, i) => (
        <Joint key={`sj-${i}`} position={pos} size={0.022} />
      ))}
      <Ribcage />
      <Bone start={[0, 1.06, 0]} end={[0, 0.9, 0]} thickness={0.035} />
      <Bone start={[-0.15, 1.45, 0]} end={[-0.25, 1.3, 0.05]} thickness={0.018} />
      <Bone start={[-0.25, 1.3, 0.05]} end={[-0.35, 1.15, 0.08]} thickness={0.016} />
      <Bone start={[-0.35, 1.15, 0.08]} end={[-0.4, 1.05, 0.1]} thickness={0.013} />
      <Bone start={[0.15, 1.45, 0]} end={[0.25, 1.3, 0.05]} thickness={0.018} />
      <Bone start={[0.25, 1.3, 0.05]} end={[0.35, 1.15, 0.08]} thickness={0.016} />
      <Bone start={[0.35, 1.15, 0.08]} end={[0.4, 1.05, 0.1]} thickness={0.013} />
      <FingerBones side="left" />
      <FingerBones side="right" />
      <Bone start={[-0.1, 0.9, 0]} end={[-0.15, 0.5, 0.02]} thickness={0.028} />
      <Bone start={[-0.15, 0.5, 0.02]} end={[-0.16, 0.08, 0.04]} thickness={0.023} />
      <Bone start={[-0.16, 0.08, 0.04]} end={[-0.16, 0.0, 0.1]} thickness={0.011} />
      <Bone start={[0.1, 0.9, 0]} end={[0.15, 0.5, 0.02]} thickness={0.028} />
      <Bone start={[0.15, 0.5, 0.02]} end={[0.16, 0.08, 0.04]} thickness={0.023} />
      <Bone start={[0.16, 0.08, 0.04]} end={[0.16, 0.0, 0.1]} thickness={0.011} />
      <Joint position={[-0.25, 1.3, 0.05]} size={0.023} />
      <Joint position={[-0.35, 1.15, 0.08]} size={0.018} />
      <Joint position={[0.25, 1.3, 0.05]} size={0.023} />
      <Joint position={[0.35, 1.15, 0.08]} size={0.018} />
      <Joint position={[-0.15, 0.5, 0.02]} size={0.028} />
      <Joint position={[-0.16, 0.08, 0.04]} size={0.022} />
      <Joint position={[0.15, 0.5, 0.02]} size={0.028} />
      <Joint position={[0.16, 0.08, 0.04]} size={0.022} />
      <Joint position={[-0.1, 0.9, 0]} size={0.032} />
      <Joint position={[0.1, 0.9, 0]} size={0.032} />
    </group>
  )
}
