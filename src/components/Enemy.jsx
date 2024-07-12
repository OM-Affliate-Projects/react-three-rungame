// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useMemo, useRef } from "react";

// export default function Enemy({ positionX }) {
//   const model = useGLTF("./oilBarrel.glb");
//   const scene = useMemo(() => {
//     return model.scene.clone();
//   }, [model]);
//   const ref = useRef();
//   const velocity = 0.05;

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.position.z += velocity;
//     }
//   });

//   return (
//     <primitive
//       object={scene}
//       scale={0.5}
//       rotation-z={1.57}
//       position={[positionX, 0.35, -20]}
//       ref={ref}
//     />
//   );
// }
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from 'three';

export default function Enemy({ positionX }) {
  const model = useGLTF("./oilBarrel.glb");
  const scene = useMemo(() => {
    const clonedScene = model.scene.clone();
    clonedScene.userData = { type: 'enemy' };
    return clonedScene;
  }, [model]);

  const ref = useRef();
  const velocity = 0.05;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.z += velocity;
    }
  });

  return (
    <primitive
      object={scene}
      scale={0.5}
      rotation-z={1.57}
      position={[positionX, 0.35, -20]}
      ref={ref}
    />
  );
}
