"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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

export type Formation =
  | "scatter"
  | "spiral"
  | "ring"
  | "grid"
  | "wave"
  | "tower";

type CubeStatic = {
  texturePath: string;
  scale: number;
  rotationSpeed: [number, number, number];
  initialRotation: [number, number, number];
  bobSpeed: number;
  bobAmplitude: number;
  phase: number;
};

const CYCLE: Formation[] = ["scatter", "spiral", "ring", "wave", "grid", "tower"];

// Compute target position for cube `i` of `count` in given formation
function targetFor(
  formation: Formation,
  i: number,
  count: number
): [number, number, number] {
  switch (formation) {
    case "ring": {
      const a = (i / count) * Math.PI * 2;
      const r = 3;
      return [Math.cos(a) * r, Math.sin(a) * 0.6, Math.sin(a) * r - 0.5];
    }
    case "spiral": {
      const t = i / count;
      const angle = t * Math.PI * 6;
      const r = 0.5 + t * 3;
      return [Math.cos(angle) * r, t * 4 - 2, Math.sin(angle) * r - 0.5];
    }
    case "grid": {
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const cx = (i % cols) - (cols - 1) / 2;
      const cy = Math.floor(i / cols) - (rows - 1) / 2;
      return [cx * 1.5, -cy * 1.5, 0];
    }
    case "wave": {
      const cols = Math.ceil(Math.sqrt(count));
      const cx = (i % cols) - (cols - 1) / 2;
      const cy = Math.floor(i / cols) - (cols - 1) / 2;
      return [cx * 1.4, Math.sin((i / count) * Math.PI * 4) * 1.4, cy * 1.4];
    }
    case "tower": {
      const stack = i % 4;
      const ring = Math.floor(i / 4);
      const a = (ring / Math.max(1, Math.floor(count / 4))) * Math.PI * 2;
      const r = 1.5;
      return [Math.cos(a) * r, stack * 1.3 - 1.5, Math.sin(a) * r - 0.5];
    }
    case "scatter":
    default: {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.4 + (i % 3) * 0.6;
      return [
        Math.cos(angle) * r,
        (i % 3 === 0 ? -0.8 : i % 3 === 1 ? 0.4 : 1.1) - 0.2,
        Math.sin(angle) * r - 0.4,
      ];
    }
  }
}

function TexturedCube({
  cube,
  index,
  count,
  formation,
  textureUrl,
}: {
  cube: CubeStatic;
  index: number;
  count: number;
  formation: Formation;
  textureUrl: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  const targetVec = useMemo(() => new THREE.Vector3(), []);

  useMemo(() => {
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Target position from current formation
    const [tx, ty, tz] = targetFor(formation, index, count);
    targetVec.set(
      tx,
      ty +
        Math.sin(state.clock.elapsedTime * cube.bobSpeed + cube.phase) *
          cube.bobAmplitude,
      tz
    );

    // Lerp to target (smooth formation transition)
    meshRef.current.position.lerp(targetVec, Math.min(1, delta * 1.4));

    // Spin
    meshRef.current.rotation.x += cube.rotationSpeed[0] * delta;
    meshRef.current.rotation.y += cube.rotationSpeed[1] * delta;
    meshRef.current.rotation.z += cube.rotationSpeed[2] * delta;

    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current.rotation);
      edgesRef.current.position.copy(meshRef.current.position);
    }
  });

  const geom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edgeGeom = useMemo(() => new THREE.EdgesGeometry(geom), [geom]);

  return (
    <group>
      <mesh
        ref={meshRef}
        rotation={cube.initialRotation}
        scale={cube.scale}
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
        rotation={cube.initialRotation}
        scale={cube.scale * 1.001}
        geometry={edgeGeom}
      >
        <lineBasicMaterial color="#111111" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function Scene({
  count,
  formation,
  pointerInfluence,
}: {
  count: number;
  formation: Formation;
  pointerInfluence: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo<CubeStatic[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      return {
        texturePath: TEXTURE_PATHS[i % TEXTURE_PATHS.length],
        scale: 0.6 + ((i % 5) * 0.18),
        rotationSpeed: [
          0.05 + (i % 4) * 0.04,
          0.07 + (i % 3) * 0.05,
          0.02 + (i % 5) * 0.02,
        ],
        initialRotation: [(i * 0.7) % Math.PI, (i * 0.9) % Math.PI, 0],
        bobSpeed: 0.4 + (i % 3) * 0.15,
        bobAmplitude: 0.08 + (i % 2) * 0.06,
        phase: i * 1.2,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    groupRef.current.rotation.x = state.pointer.y * pointerInfluence;
    groupRef.current.rotation.z = state.pointer.x * -pointerInfluence * 0.4;
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <TexturedCube
          key={i}
          cube={cube}
          index={i}
          count={count}
          formation={formation}
          textureUrl={cube.texturePath}
        />
      ))}
    </group>
  );
}

export function TexturedCubes({
  className = "",
  count = 12,
  initialFormation = "scatter",
  cycle = true,
  cycleMs = 5000,
  pointerInfluence = 0.18,
  cameraZ = 7,
}: {
  className?: string;
  count?: number;
  initialFormation?: Formation;
  cycle?: boolean;
  cycleMs?: number;
  pointerInfluence?: number;
  cameraZ?: number;
}) {
  const [formation, setFormation] = useState<Formation>(initialFormation);

  useEffect(() => {
    if (!cycle) return;
    let i = CYCLE.indexOf(initialFormation);
    if (i < 0) i = 0;
    const id = setInterval(() => {
      i = (i + 1) % CYCLE.length;
      setFormation(CYCLE[i]);
    }, cycleMs);
    return () => clearInterval(id);
  }, [cycle, cycleMs, initialFormation]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Formation indicator */}
      {cycle && (
        <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
          <div className="mono text-[0.55rem] tracking-[0.3em] uppercase text-right">
            <p className="text-zinc-500 opacity-60">formation</p>
            <p className="text-zinc-900 mt-1">/ {formation}</p>
          </div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#fffaf0" />
        <Suspense fallback={null}>
          <Scene
            count={count}
            formation={formation}
            pointerInfluence={pointerInfluence}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
