import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import Tag3D from "./Tag3D";

export default function TagScene({ onSelect, activeId, height = "100%", tags = [] }) {
  return (
    <div style={{ width: "100%", height }}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 7.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <spotLight position={[6, 8, 6]} angle={0.35} penumbra={1} intensity={2} color="#ffffff" />
          <pointLight position={[-6, -3, -4]} intensity={1.2} color="#4DFCFF" />
          <pointLight position={[4, -2, 3]} intensity={0.6} color="#4DFCFF" />

          {/* Fully procedural environment (no external HDRI fetch) so metallic
              reflections work offline and never depend on a third-party CDN. */}
          <Environment resolution={256}>
            <Lightformer intensity={2.5} color="#ffffff" position={[0, 4, 0]} scale={[6, 6, 1]} form="rect" />
            <Lightformer intensity={3} color="#4DFCFF" position={[-4, 1, 4]} scale={[3, 3, 1]} form="rect" />
            <Lightformer intensity={2} color="#4DFCFF" position={[4, -1, -4]} scale={[3, 3, 1]} form="rect" />
            <Lightformer intensity={1.2} color="#ffffff" position={[0, -4, 2]} scale={[8, 2, 1]} form="rect" />
          </Environment>

          {tags.map((tag, i) => (
            <Tag3D
              key={tag.id}
              tag={tag}
              index={i}
              orbitRadius={2.6}
              orbitAngle={(i / tags.length) * Math.PI * 2}
              orbitSpeed={0.18}
              onSelect={onSelect}
              isActive={activeId === tag.id}
            />
          ))}

          <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={12} blur={2.5} far={3} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  );
}
