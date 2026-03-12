import { Scene } from "./components/Scene";

function App() {
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
    </main>
  );
}

export default App;
