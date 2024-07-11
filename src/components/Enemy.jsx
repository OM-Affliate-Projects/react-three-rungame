import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Enemy() {
  const { animations } = useGLTF("./oilBarrel.glb");
  const gltf = useLoader(GLTFLoader, "./oilBarrel.glb");
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });

  const { ref, actions, names } = useAnimations(animations);

  useFrame(() => {
    let newVelocity = { ...velocity };
    newVelocity.z = 0.05;

    ref.current.position.z += newVelocity.z;

    setVelocity(newVelocity);
  });

  return (
    <>
      <primitive
        object={gltf.scene}
        scale={0.5}
        rotation-z={1.57}
        position-y={0.35}
        ref={ref}
      />
    </>
  );
}
