import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Player } from "./components";

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Suspense fallback={null}>
        <Player />
        <OrbitControls />
        <Environment preset="park" background />
      </Suspense>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
    </Canvas>
  );
}
