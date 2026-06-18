import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import SkeletonModel from './SkeletonModel'

function CameraDrift() {
  const { camera } = useThree()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.08) * 0.15
    camera.position.y = 0.3 + Math.cos(t * 0.06) * 0.1
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Fog() {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#0A0A0A', 0.08)
    return () => { scene.fog = null }
  }, [scene])
  return null
}

function DebrisParticles() {
  const count = 80
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16
      const c = Math.random()
      if (c < 0.08) {
        colors[i * 3] = 0.36; colors[i * 3 + 1] = 0.1; colors[i * 3 + 2] = 0.1
      } else {
        const v = 0.1 + Math.random() * 0.2
        colors[i * 3] = v; colors[i * 3 + 1] = v; colors[i * 3 + 2] = v
      }
    }
    return { pos, colors }
  }, [])
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.005
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.pos} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={positions.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

function WireframeRings() {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = clock.getElapsedTime() * 0.03
    groupRef.current.rotation.z = clock.getElapsedTime() * 0.015
  })
  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.003, 8, 60]} />
        <meshStandardMaterial color="#1A1A1A" emissive="#1a0f6e" emissiveIntensity={0.08} transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.002, 8, 60]} />
        <meshStandardMaterial color="#111111" emissive="#1A1A1A" emissiveIntensity={0.04} transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.3, 4.5], fov: 40 }} dpr={[1, 1.5]}>
      <CameraDrift />
      <Fog />
      <ambientLight intensity={0.12} />
      <directionalLight position={[3, 5, 5]} intensity={0.6} color="#C2C2B4" />
      <directionalLight position={[-3, -2, -3]} intensity={0.15} color="#3a1fb8" />
      <pointLight position={[0, 2, 3]} intensity={0.3} color="#C2C2B4" />
      <SkeletonModel />
      <WireframeRings />
      <DebrisParticles />
    </Canvas>
  )
}
