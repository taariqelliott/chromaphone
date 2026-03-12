import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { playSound } from "./AudioManager";

interface KeyProps {
  position: [number, number, number];
  id: number;
  color: string;
  setActiveColor: (color: string) => void;
  isExternalPressed?: boolean;
}

export const Key: React.FC<KeyProps> = ({
  position,
  id,
  color,
  setActiveColor,
  isExternalPressed,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [internalPressed, setInternalPressed] = useState(false);

  const isDown = internalPressed || isExternalPressed;

  useFrame(() => {
    if (!meshRef.current) return;

    // Smooth movement logic
    const targetY = isDown ? -0.5 : 0;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.2
    );

    // Smooth scaling logic
    const targetScale = hovered ? 1.1 : 1.0;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.15)
    );
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setInternalPressed(true);
    playSound(id);
    setActiveColor(color);
    setTimeout(() => setInternalPressed(false), 150);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={handlePointerDown}
    >
      <boxGeometry args={[0.8, 0.5, 2.8]} />
      <meshStandardMaterial
        color={color}
        emissive={new THREE.Color(color)}
        emissiveIntensity={isDown ? 12 : hovered ? 2 : 0.6}
      />
    </mesh>
  );
};
