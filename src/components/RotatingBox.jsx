import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function RotatingBox() {
  const myMesh = useRef();

  useFrame(({ clock }) => {
    const a = Math.sin(clock.getElapsedTime());
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh ref={myMesh}>
      <boxGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}
