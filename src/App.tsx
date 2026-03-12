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
          textAlign: "center",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "monospace",
          pointerEvents: "none",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Keys: Z-M | A-L | Q-Y
      </div>
    </main>
  );
}

export default App;
