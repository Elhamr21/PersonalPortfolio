"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Html, OrbitControls } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "infrastructure";
}

const skills: Skill[] = [
  { name: "JavaScript/TS", level: 5, category: "frontend" },
  { name: "React", level: 5, category: "frontend" },
  { name: "HTML/CSS", level: 5, category: "frontend" },
  { name: "UI/UX", level: 4, category: "frontend" },
  { name: "Node.js", level: 5, category: "backend" },
  { name: "PHP", level: 5, category: "backend" },
  { name: "Python", level: 3, category: "backend" },
  { name: "C#/.NET", level: 3, category: "backend" },
  { name: "REST APIs", level: 5, category: "backend" },
  { name: "MySQL", level: 5, category: "infrastructure" },
  { name: "MongoDB", level: 4, category: "infrastructure" },
  { name: "AWS", level: 4, category: "infrastructure" },
  { name: "GitHub", level: 5, category: "infrastructure" },
];

const categoryColors = {
  frontend: "#00D4FF",
  backend: "#FFB74D",
  infrastructure: "#64FFDA",
};

// Skill orb component
function SkillOrb({
  skill,
  position,
  index,
}: {
  skill: Skill;
  position: [number, number, number];
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[skill.category];
  const size = 0.08 + skill.level * 0.02;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.3 : 1}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Glow */}
        <mesh scale={1.5}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        {/* Label on hover */}
        {hovered && (
          <Html position={[0, size + 0.15, 0]} center distanceFactor={5}>
            <div className="px-3 py-2 bg-space-mid/95 backdrop-blur-sm rounded-lg border border-primary/40 shadow-lg">
              <p className="text-sm font-medium text-foreground whitespace-nowrap">
                {skill.name}
              </p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < skill.level ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

// Category sphere (central hub)
function CategorySphere({
  category,
  position,
}: {
  category: "frontend" | "backend" | "infrastructure";
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const color = categoryColors[category];

  const labels = {
    frontend: "FE",
    backend: "BE",
    infrastructure: "DB",
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#112240"
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.01, 16, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text
        position={[0, 0, 0.27]}
        fontSize={0.12}
        color={color}
        font="/fonts/GeistMono-Bold.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {labels[category]}
      </Text>
    </group>
  );
}

// Connection lines between skills
function ConnectionLines({
  skills,
  categoryPositions,
}: {
  skills: { skill: Skill; position: [number, number, number] }[];
  categoryPositions: Record<string, [number, number, number]>;
}) {
  return (
    <group>
      {skills.map((item, index) => {
        const catPos = categoryPositions[item.skill.category];
        const color = categoryColors[item.skill.category];
        
        const points = [
          new THREE.Vector3(...catPos),
          new THREE.Vector3(...item.position),
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={index} geometry={lineGeometry}>
            <lineBasicMaterial
              color={color}
              transparent
              opacity={0.15}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
}

// Main skills 3D scene
export function Skills3DScene({ activeCategory }: { activeCategory: string }) {
  const categoryPositions: Record<string, [number, number, number]> = {
    frontend: [-2, 0, 0],
    backend: [0, 0, 0],
    infrastructure: [2, 0, 0],
  };

  // Calculate skill positions around their category
  const skillPositions = skills.map((skill, index) => {
    const catSkills = skills.filter((s) => s.category === skill.category);
    const catIndex = catSkills.findIndex((s) => s.name === skill.name);
    const catPos = categoryPositions[skill.category];
    
    const angle = (catIndex / catSkills.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 0.8 + (5 - skill.level) * 0.1;
    
    return {
      skill,
      position: [
        catPos[0] + Math.cos(angle) * radius,
        catPos[1] + Math.sin(angle) * radius * 0.6,
        catPos[2] + Math.sin(angle) * 0.3,
      ] as [number, number, number],
    };
  });

  const filteredSkills =
    activeCategory === "all"
      ? skillPositions
      : skillPositions.filter((item) => item.skill.category === activeCategory);

  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#FFB74D" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />

          {/* Category spheres */}
          {(activeCategory === "all" || activeCategory === "frontend") && (
            <CategorySphere category="frontend" position={categoryPositions.frontend} />
          )}
          {(activeCategory === "all" || activeCategory === "backend") && (
            <CategorySphere category="backend" position={categoryPositions.backend} />
          )}
          {(activeCategory === "all" || activeCategory === "infrastructure") && (
            <CategorySphere
              category="infrastructure"
              position={categoryPositions.infrastructure}
            />
          )}

          {/* Skill orbs */}
          {filteredSkills.map((item, index) => (
            <SkillOrb
              key={item.skill.name}
              skill={item.skill}
              position={item.position}
              index={index}
            />
          ))}

          {/* Connection lines */}
          <ConnectionLines
            skills={filteredSkills}
            categoryPositions={categoryPositions}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
