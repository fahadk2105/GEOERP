"use client"

import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

// This component renders a 3D building model
// In a real application, you would load actual 3D models for each building
export default function BuildingModel({ buildingId = "all" }) {
  return (
    <div className="h-full w-full">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={30} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Suspense fallback={null}>{buildingId === "all" ? <SocietyModel /> : <Building id={buildingId} />}</Suspense>
      </Canvas>
    </div>
  )
}

// Renders an individual building
function Building({ id }) {
  // Different building colors based on ID
  const colorMap = {
    "building-a": "#3b82f6", // blue
    "building-b": "#10b981", // green
    "building-c": "#f59e0b", // yellow
    "building-d": "#8b5cf6", // purple
    "building-e": "#ec4899", // pink
    clubhouse: "#ef4444", // red
  }

  // Different building sizes based on ID
  const sizeMap = {
    "building-a": [4, 8, 4],
    "building-b": [4, 8, 4],
    "building-c": [4, 10, 4],
    "building-d": [4, 10, 4],
    "building-e": [4, 12, 4],
    clubhouse: [6, 2, 6],
  }

  const color = colorMap[id] || "#9ca3af"
  const [width, height, depth] = sizeMap[id] || [4, 6, 4]

  return (
    <group>
      {/* Building base */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Add windows */}
      {Array.from({ length: Math.floor(height) - 1 }).map((_, floorIndex) => {
        return Array.from({ length: 4 }).map((_, windowIndex) => {
          let windowPosX = 0
          let windowPosZ = 0

          if (windowIndex === 0) {
            windowPosX = -width / 2 - 0.01
            windowPosZ = -depth / 4
          } else if (windowIndex === 1) {
            windowPosX = -width / 2 - 0.01
            windowPosZ = depth / 4
          } else if (windowIndex === 2) {
            windowPosX = width / 4
            windowPosZ = depth / 2 + 0.01
          } else {
            windowPosX = -width / 4
            windowPosZ = depth / 2 + 0.01
          }

          return (
            <mesh
              key={`window-${floorIndex}-${windowIndex}`}
              position={[windowPosX, floorIndex + 1.5, windowPosZ]}
              rotation={[0, windowIndex < 2 ? -Math.PI / 2 : 0, 0]}
            >
              <planeGeometry args={[0.8, 1.2]} />
              <meshStandardMaterial color="#90cdf4" />
            </mesh>
          )
        })
      })}
    </group>
  )
}

// Renders the entire society with multiple buildings
function SocietyModel() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#d1fae5" />
      </mesh>

      {/* Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[6, 40]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 6]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* Buildings */}
      <group position={[-12, 0, -12]}>
        <Building id="building-a" />
      </group>
      <group position={[12, 0, -12]}>
        <Building id="building-b" />
      </group>
      <group position={[-12, 0, 12]}>
        <Building id="building-c" />
      </group>
      <group position={[12, 0, 12]}>
        <Building id="building-d" />
      </group>

      {/* Clubhouse at the center */}
      <group position={[0, 0, 0]}>
        <Building id="clubhouse" />
      </group>
    </group>
  )
}

