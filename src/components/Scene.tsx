import { useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import { Key } from "./Key";
import { playSound } from "./AudioManager";
import type { KeyData } from "../types";

const KEYBOARD_MAP: Record<string, number> = {
  z: 1,
  x: 2,
  c: 3,
  v: 4,
  b: 5,
  n: 6,
  m: 7,
  ",": 8,
  ".": 9,
  "/": 10,
  a: 11,
  s: 12,
  d: 13,
  f: 14,
  g: 15,
  h: 16,
  j: 17,
  k: 18,
  l: 19,
  q: 20,
  w: 21,
  e: 22,
  r: 23,
  t: 24,
  y: 25,
};

export const Scene = () => {
  const [activeColor, setActiveColor] = useState("#000000");
  const [pressedId, setPressedId] = useState<number | null>(null);

  const keys: KeyData[] = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      color: `hsl(${(i / 25) * 360}, 85%, 60%)`,
    }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const id = KEYBOARD_MAP[e.key.toLowerCase()];
      if (id) {
        playSound(id);
        setActiveColor(keys[id - 1].color);
        setPressedId(id);
        setTimeout(
          () => setPressedId((prev) => (prev === id ? null : prev)),
          150
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: `radial-gradient(circle at center, ${activeColor}77 0%, #000000 100%)`,
        transition: "background 0.5s ease-out",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 12, 30], fov: 35 }}>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
        />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 10, 5]} intensity={2} />

        {keys.map((k, i) => (
          <Key
            key={k.id}
            position={[(i - 12) * 1.05, 0, 0]}
            id={k.id}
            color={k.color}
            setActiveColor={setActiveColor}
            isExternalPressed={pressedId === k.id}
          />
        ))}

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.1}
            intensity={2.0}
            mipmapBlur
            radius={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
