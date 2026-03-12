import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Pixelation,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useMemo, useState } from "react";
import type { KeyData } from "../types";
import { playSound } from "./AudioManager";
import { Key } from "./Key";

const KEYBOARD_MAP: Record<string, number> = {
  z: 1,
  x: 2,
  c: 3,
  v: 4,
  b: 5,
  n: 6,
  m: 7,
  a: 8,
  s: 9,
  d: 10,
  f: 11,
  g: 12,
  h: 13,
  j: 14,
  k: 15,
  l: 16,
  q: 17,
  w: 18,
  e: 19,
  r: 20,
  t: 21,
  y: 22,
  u: 23,
  i: 24,
  o: 25,
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
          enablePan={false}
        />

        {keys.map((k, i) => (
          <Key
            key={k.id}
            position={[(i - 12) * 1, 0, 0]}
            id={k.id}
            color={k.color}
            setActiveColor={setActiveColor}
            isExternalPressed={pressedId === k.id}
          />
        ))}

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.01}
            intensity={2.0}
            mipmapBlur
            radius={0.9}
          />
          <Noise opacity={0.1} />
          <DepthOfField bokehScale={1} />
          <Pixelation granularity={0.5} />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.001, 0.0001]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
