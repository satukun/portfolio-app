"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const TEXTURE_PATHS = [
  "/works/watch-yoshida.jpg",
  "/works/tk-marathon.jpg",
  "/works/jishin-hoken.jpg",
  "/works/mobimaru.jpg",
  "/works/strap.jpg",
  "/works/489pro.jpg",
];

type CubeSpec = {
  texturePath: string;
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
  initialRotation: [number, number, number];
  bobSpeed: number;
  bobAmplitude: number;
  phase: number;
};

function TexturedCube({ spec }: { spec: CubeSpec }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const texture = useLoader(THREE.TextureLoader, spec.texturePath);

  // sharpen + tone
  useMemo(() => {
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += spec.rotationSpeed[0] * delta;
    meshRef.current.rotation.y += spec.rotationSpeed[1] * delta;
    meshRef.current.rotation.z += spec.rotationSpeed[2] * delta;
    meshRef.current.position.y =
      spec.position[1] +
      Math.sin(state.clock.elapsedTime * spec.bobSpeed + spec.phase) *
        spec.bobAmplitude;

    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current.rotation);
      edgesRef.current.position.copy(meshRef.current.position);
    }
  });

  // Geometry shared via memo
  const geom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edgeGeom = useMemo(() => new THREE.EdgesGeometry(geom), [geom]);

  return (
    <group>
      <mesh
        ref={meshRef}
        position={spec.position}
        rotation={spec.initialRotation}
        scale={spec.scale}
        geometry={geom}
      >
        <meshStandardMaterial
          map={texture}
          roughness={0.55}
          metalness={0.05}
          envMapIntensity={0.6}
        />
      </mesh>
      <lineSegments
        ref={edgesRef}
        position={spec.position}
        rotation={spec.initialRotation}
        scale={spec.scale * 1.001}
        geometry={edgeGeom}
      >
        <lineBasicMaterial color="#111111" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo<CubeSpec[]>(() => {
    const count = TEXTURE_PATHS.length;
    return TEXTURE_PATHS.map((path, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + (i % 2 === 0 ? 0.5 : -0.2);
      return {
        texturePath: path,
        position: [
          Math.cos(angle) * radius,
          (i % 3 === 0 ? -0.6 : i % 3 === 1 ? 0.4 : 1.0) - 0.2,
          Math.sin(angle) * radius - 0.5,
        ],
        scale: 0.75 + (i % 3) * 0.25,
        rotationSpeed: [
          0.06 + (i % 4) * 0.04,
          0.08 + (i % 3) * 0.05,
          0.02 + (i % 5) * 0.02,
        ],
        initialRotation: [
          (i * 0.7) % Math.PI,
          (i * 0.9) % Math.PI,
          0,
        ],
        bobSpeed: 0.4 + (i % 3) * 0.15,
        bobAmplitude: 0.1 + (i % 2) * 0.08,
        phase: i * 1.2,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    groupRef.current.rotation.x = state.pointer.y * 0.18;
    groupRef.current.rotation.z = state.pointer.x * -0.06;
  });

  return (
    <group ref={groupRef}>
      {cubes.map((spec, i) => (
        <TexturedCube key={i} spec={spec} />
      ))}
    </group>
  );
}

export function TexturedCubes({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#fffaf0" />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
