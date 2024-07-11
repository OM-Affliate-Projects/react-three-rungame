import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default function Enemy() {

    const gltf = useLoader(GLTFLoader, "./oilBarrel.glb")
  
  
  
  
  
  
  
    return (
    <>
        <primitive
            object={gltf.scene}
            scale={0.5}
            rotation-z={1.57}
            position-y={0.35}
        />
    </>
  )
}
