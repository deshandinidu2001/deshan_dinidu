"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, PerformanceMonitor } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
type Props = {
  progress: React.RefObject<number>;
  lab?: boolean;
  mobile: boolean;
  active?: boolean;
};
function Network({ progress, lab = false, mobile }: Props) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const packet = useRef<THREE.Mesh>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: mobile ? 25 : 48 }, (_, i) => {
        if (lab) {
          const perLayer = mobile ? 5 : 8;
          const angle = ((i % perLayer) / perLayer) * Math.PI * 2;
          const layer = Math.floor(i / perLayer);
          return new THREE.Vector3(
            (layer - (mobile ? 2 : 2.5)) * 1.05,
            Math.sin(angle) * (0.7 + Math.sin(layer) * 0.2),
            Math.cos(angle) * 0.85,
          );
        }
        const y = 1 - (i / (mobile ? 24 : 47)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = i * 2.39996;
        return new THREE.Vector3(
          Math.cos(theta) * radius * 2.6,
          y * 2.55,
          Math.sin(theta) * radius * 2.6,
        );
      }),
    [mobile, lab],
  );
  const edges = useMemo(() => {
    const list: [THREE.Vector3, THREE.Vector3][] = [];
    nodes.forEach((a, i) =>
      nodes.forEach((b, j) => {
        if (j > i && a.distanceTo(b) < 1.9) list.push([a, b]);
      }),
    );
    return list;
  }, [nodes]);
  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    const p = progress.current;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.2 +
        p * (lab ? 2.4 : 0.9) +
        state.clock.elapsedTime * 0.035,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -state.pointer.y * 0.15 + 0.15 + p * 0.22,
      3,
      delta,
    );
    core.current.rotation.y -= delta * 0.12;
    core.current.rotation.z += delta * 0.06;
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      lab ? 9 - p * 2.3 : 9 - p * 0.8,
      2,
      delta,
    );
    if (lab) {
      group.current.scale.setScalar(1 - p * 0.16);
      group.current.rotation.z = p * 0.3;
    }
    if (packet.current) {
      const t = (state.clock.elapsedTime * 0.22) % 1;
      if (lab)
        packet.current.position.set(
          -3.6 + t * 7.2,
          Math.sin(t * Math.PI * 4) * 0.18,
          0.25,
        );
      else packet.current.position.lerpVectors(nodes[3], nodes[9], t);
    }
  });
  return (
    <group ref={group} rotation={[0.1, 0, -0.1]}>
      {edges.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={i % 9 === 0 ? "#C8FF3D" : "#64717d"}
          transparent
          opacity={i % 9 === 0 ? 0.5 : 0.27}
          lineWidth={0.65}
        />
      ))}
      {nodes.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[i % 7 === 0 ? 0.075 : 0.035, 8, 8]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#C8FF3D" : "#a0aab1"} />
        </mesh>
      ))}
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.87, 0]} />
          <meshStandardMaterial
            color="#344523"
            metalness={0.8}
            roughness={0.26}
            flatShading
          />
        </mesh>
        <mesh scale={1.012}>
          <icosahedronGeometry args={[0.87, 0]} />
          <meshBasicMaterial
            wireframe
            color="#C8FF3D"
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.4, 0]}>
          <torusGeometry args={[1.24, 0.012, 6, 80]} />
          <meshBasicMaterial color="#C8FF3D" />
        </mesh>
      </group>
      {(lab ? [0] : [0, 1, 2]).map((i) => (
        <mesh key={i} rotation={[0.55 + i * 0.75, 0.4 + i * 0.65, 0.2]}>
          <torusGeometry args={[3.15 + i * 0.13, 0.005, 3, 100]} />
          <meshBasicMaterial color="#87949F" transparent opacity={0.28} />
        </mesh>
      ))}
      <mesh ref={packet}>
        <sphereGeometry args={[0.085, 10, 10]} />
        <meshBasicMaterial color="#C8FF3D" />
      </mesh>
      {lab &&
        [-3.5, 3.5].map((x, i) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh>
              <octahedronGeometry args={[0.3, 0]} />
              <meshBasicMaterial wireframe color="#C8FF3D" />
            </mesh>
            <Line
              points={[
                [0, 0, 0],
                [i === 0 ? 2.5 : -2.5, 0, 0],
              ]}
              color="#C8FF3D"
              transparent
              opacity={0.45}
            />
          </group>
        ))}
    </group>
  );
}
export default function SignalScene({
  progress,
  lab = false,
  mobile,
  active = true,
}: Props) {
  const [dpr, setDpr] = useState(1.25);
  return (
    <Canvas
      className="signal-canvas"
      frameloop={active ? "always" : "never"}
      dpr={mobile ? 1 : dpr}
      camera={{ position: [0, 0, 9], fov: 44 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "low-power" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#d8f5b1" />
      <pointLight position={[-3, -2, 2]} intensity={9} color="#87949F" />
      <Network progress={progress} lab={lab} mobile={mobile} />
    </Canvas>
  );
}
