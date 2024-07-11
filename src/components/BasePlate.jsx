import { useRef } from "react";

export default function BasePlate({ args, color }) {
  const mesh = useRef();

  return (
    <mesh ref={mesh} position={[0, -0.5, -20]}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
