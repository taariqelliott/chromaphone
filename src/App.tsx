import { Scene } from "./components/Scene";
import { useState } from "react";
import { Github } from "lucide-react";

function App() {
  const [hovered, setHovered] = useState(false);

  return (
    <main style={{ backgroundColor: "#000" }}>
      <Scene />
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "monospace",
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontSize: "12px",
        }}
      >
        <div>Play: Z-M | A-L | Q-O</div>
        <div style={{ opacity: 1, fontSize: "10px" }}>
          Orbit: Left Click to Rotate • Scroll to Zoom
        </div>
      </div>
      <a
        href="https://github.com/taariqelliott/chromaphone"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          color: "white",
          opacity: hovered ? 1 : 0.45,
          filter: hovered ? "brightness(1.4)" : "brightness(1)",
          transition: "opacity 0.1s ease, filter 0.1s ease",
          cursor: "pointer",
        }}
      >
        <Github size={22} />
      </a>
    </main>
  );
}

export default App;
