"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/cn";

type Arc = { start: number; length: number };

type Ring = {
  /** Outer radius */
  outer: number;
  /** Ring thickness (outer − inner) */
  thickness: number;
  /** Extrude depth — gives the flat-plate dimension */
  depth: number;
  /** Z offset for parallax between rings */
  z: number;
  /** Group rotation speed in rad/sec, signed for direction */
  speed: number;
  /** Arcs (in radians) — gaps are the spaces between */
  arcs: Arc[];
};

const RINGS: Ring[] = [
  {
    outer: 1.5,
    thickness: 0.2,
    depth: 0.12,
    z: 0,
    speed: 0.04,
    arcs: [
      { start: 0.1, length: Math.PI * 0.85 },
      { start: Math.PI * 1.05, length: Math.PI * 0.5 },
      { start: Math.PI * 1.65, length: Math.PI * 0.3 },
    ],
  },
  {
    outer: 2.05,
    thickness: 0.22,
    depth: 0.14,
    z: -0.08,
    speed: -0.028,
    arcs: [
      { start: 0.5, length: Math.PI * 0.95 },
      { start: Math.PI * 1.55, length: Math.PI * 0.4 },
    ],
  },
  {
    outer: 2.65,
    thickness: 0.24,
    depth: 0.16,
    z: -0.16,
    speed: 0.022,
    arcs: [
      { start: -0.2, length: Math.PI * 0.7 },
      { start: Math.PI * 0.8, length: Math.PI * 0.55 },
      { start: Math.PI * 1.55, length: Math.PI * 0.4 },
    ],
  },
];

/** Build an annular-sector Shape (a slice of a ring). */
function makeArcShape(
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
): THREE.Shape {
  const shape = new THREE.Shape();
  // Walk outer arc startAngle → endAngle
  shape.absarc(0, 0, outerR, startAngle, endAngle, false);
  // Connect outer end → inner end
  shape.lineTo(
    Math.cos(endAngle) * innerR,
    Math.sin(endAngle) * innerR,
  );
  // Walk inner arc back endAngle → startAngle
  shape.absarc(0, 0, innerR, endAngle, startAngle, true);
  // Close back to outer start
  shape.closePath();
  return shape;
}

function RingGroup({ ring }: { ring: Ring }) {
  const groupRef = useRef<THREE.Group>(null);

  const geoms = useMemo(() => {
    const inner = ring.outer - ring.thickness;
    return ring.arcs.map((arc) => {
      const shape = makeArcShape(
        inner,
        ring.outer,
        arc.start,
        arc.start + arc.length,
      );
      return new THREE.ExtrudeGeometry(shape, {
        depth: ring.depth,
        bevelEnabled: true,
        bevelSize: 0.012,
        bevelThickness: 0.012,
        bevelSegments: 2,
        curveSegments: 64,
      });
    });
  }, [ring]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * ring.speed;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, ring.z]}>
      {geoms.map((geom, i) => (
        <mesh key={i} geometry={geom}>
          <meshStandardMaterial
            color="#F4F4F5"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    // Subtle mouse parallax on the whole stack
    const { x, y } = state.mouse;
    g.position.x += (x * 0.25 - g.position.x) * 0.02;
    g.position.y += (y * 0.15 - g.position.y) * 0.02;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[-3, 2.5, 4]}
        intensity={1.6}
        color="#FFFFFF"
      />
      <directionalLight
        position={[2, -3, 2]}
        intensity={0.4}
        color="#E4E4E7"
      />
      <group ref={groupRef}>
        {RINGS.map((ring, i) => (
          <RingGroup key={i} ring={ring} />
        ))}
      </group>
    </>
  );
}

type Props = {
  fade?: "up" | "down" | "none";
  className?: string;
};

export default function ParticleBackdropCanvas({
  fade = "up",
  className,
}: Props) {
  const mask =
    fade === "up"
      ? "linear-gradient(to top, black 0%, rgba(0,0,0,0.05) 100%)"
      : fade === "down"
        ? "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.05) 100%)"
        : undefined;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 motion-reduce:hidden",
        className,
      )}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
