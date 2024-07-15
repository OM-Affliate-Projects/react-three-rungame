import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function Enemy({ positionX }) {
  const model = useGLTF("./oilBarrel.glb");
  const scene = useMemo(() => {
    const clonedScene = model.scene.clone();
    clonedScene.userData = { type: "enemy" };
    return clonedScene;
  }, [model]);

  const ref = useRef();
  const boxHelper = useRef();
  const { scene: mainScene } = useThree();

  useEffect(() => {
    if (ref.current) {
      boxHelper.current = new THREE.BoxHelper(ref.current, 0xff0000);
      mainScene.add(boxHelper.current);
    }
    return () => {
      if (boxHelper.current) {
        scene.remove(boxHelper.current);
      }
    };
  }, [mainScene]);

  const velocity = 0.05;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.z += velocity;

      if (boxHelper.current) {
        boxHelper.current.update();
      }
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
