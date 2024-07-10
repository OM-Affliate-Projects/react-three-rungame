import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Player() {
  const gltf = useLoader(GLTFLoader, "./ReadiedAsset.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={1} />
    </>
  );
}
