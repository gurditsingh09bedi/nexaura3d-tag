import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// One floating tag in the orbital scene. Orbits slowly around the group
// center; on hover it eases toward the camera and lights up, then eases
// back out when the pointer leaves.
export default function Tag3D({ tag, orbitRadius, orbitAngle, orbitSpeed, index, onSelect, isActive }) {
  const group = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // target values we lerp toward every frame
  const target = useRef({ z: 0, scale: 1, emissive: 0.15 });

  useFrame((state, delta) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;
    const angle = orbitAngle + t * orbitSpeed;

    const baseX = Math.cos(angle) * orbitRadius;
    const baseY = Math.sin(t * 0.5 + index) * 0.25;
    const baseZ = Math.sin(angle) * orbitRadius;

    // gentle self-rotation so the metal catches the light as it drifts
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.08;
    }

    target.current.z = hovered || isActive ? 2.6 : 0;
    target.current.scale = hovered || isActive ? 1.35 : 1;
    target.current.emissive = hovered || isActive ? 0.9 : 0.15;

    const pullToCenter = hovered || isActive ? 0.55 : 0; // pulls tag toward screen center on hover
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, baseX * (1 - pullToCenter), 0.08);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, baseY, 0.08);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, baseZ + target.current.z, 0.08);

    const s = THREE.MathUtils.lerp(group.current.scale.x, target.current.scale, 0.1);
    group.current.scale.set(s, s, s);

    if (meshRef.current?.material) {
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity ?? 0.15,
        target.current.emissive,
        0.1
      );
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onSelect?.(tag); }}
    >
      <RoundedBox ref={meshRef} args={[1.5, 2.4, 0.08]} radius={0.12} smoothness={6}>
        <meshPhysicalMaterial
          color={tag.baseColor || "#8a8d92"}
          metalness={tag.metalness}
          roughness={tag.roughness}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          emissive={tag.accent}
          emissiveIntensity={0.15}
          reflectivity={1}
        />
      </RoundedBox>

      {/* thin glowing seam near the base, on-brand accent detail */}
      <mesh position={[0, -1.05, 0.045]}>
        <planeGeometry args={[1.1, 0.04]} />
        <meshBasicMaterial color={tag.accent} toneMapped={false} />
      </mesh>
    </group>
  );
}
