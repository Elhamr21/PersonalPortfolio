"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, Html, Environment } from "@react-three/drei";
import { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";

/* =========================
   Floating tech orb
========================= */
function TechOrb({
  label,
  position,
  color,
  delay = 0,
}: {
  label: string;
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Glow */}
        <mesh scale={hovered ? 1.5 : 1.3}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>

        {/* Label */}
        <Html center distanceFactor={8}>
          <div className="px-2 py-1 bg-space-mid/90 backdrop-blur-sm rounded-md border border-primary/30 text-xs font-mono text-foreground whitespace-nowrap">
            {label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

/* =========================
   Particle field
========================= */
function ParticleField({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      if (Math.random() > 0.7) {
        colors.set([1, 0.72, 0.3], i * 3);
      } else {
        colors.set([0, 0.83, 1], i * 3);
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = mouse.y * 0.1;
      mesh.current.rotation.z = mouse.x * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* =========================
   Central sphere
========================= */
function IdentitySphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    meshRef.current && (meshRef.current.rotation.y += 0.005);
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      ringRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          color="#0A192F"
          emissive="#00D4FF"
          emissiveIntensity={0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh scale={0.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.3} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.7, 0.02, 16, 100]} />
        <meshStandardMaterial emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>

      <Text
        position={[0, 0, 0.52]}
        fontSize={0.25}
        color="#00D4FF"
        font="/fonts/Geist-Bold.ttf"
        anchorX="center"
        anchorY="middle"
      >
        ER
      </Text>
    </group>
  );
}

/* =========================
   Camera controller
========================= */
function CameraController() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.5,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.3,
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* =========================
   RESPONSIVE CONTENT (FIX)
========================= */
function SceneContent() {
  const { viewport } = useThree();

  // ⭐ KJO ËSHTË FIX-I KRYESOR
  const radius = Math.min(2.2, viewport.width * 0.35);


const techOrbs = [
  { label: "React", color: "#61DAFB", angle: 0 },
  { label: "Node.js", color: "#68A063", angle: (1 / 5) * Math.PI * 2 },
  { label: "TypeScript", color: "#3178C6", angle: (2 / 5) * Math.PI * 2 },
  { label: "AWS", color: "#FF9900", angle: (3 / 5) * Math.PI * 2 },
  { label: "MongoDB", color: "#47A248", angle: (4 / 5) * Math.PI * 2, yOffset: -0.4 }, // MongoDB më poshtë
];


  return (
    <>
      <ParticleField count={300} />
      <IdentitySphere />

      {techOrbs.map((orb, i) => {
  const x = Math.cos(orb.angle) * radius;
  const z = Math.sin(orb.angle) * radius;

  // përdor yOffset nëse ka
  const y = (Math.sin(orb.angle * 2) * 0.35) + (orb.yOffset || 0);

  return (
    <TechOrb
      key={orb.label}
      label={orb.label}
      position={[x, y, z]}
      color={orb.color}
      delay={i * 0.5}
    />
  );
})}
    </>
  );
}

/* =========================
   MAIN SCENE
========================= */
export function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <CameraController />
          <SceneContent />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
