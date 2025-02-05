import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Player({ position }) {
  const { scene, animations } = useGLTF("/ReadiedAsset.glb");
  const { ref, actions, names } = useAnimations(animations);

  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [keysPressed, setKeysPressed] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    jump: false,
  });

  const [index] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          setKeysPressed((prev) => ({ ...prev, forward: true }));
          actions[names[1]].play();
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: true }));
          actions[names[1]].play();
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: true }));
          actions[names[1]].play();
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: true }));
          actions[names[1]].play();
          break;
        case "Space":
          setKeysPressed((prev) => ({ ...prev, jump: true }));
          actions[names[2]].play();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          setKeysPressed((prev) => ({ ...prev, forward: false }));
          actions[names[1]].stop();
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: false }));
          actions[names[1]].stop();
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: false }));
          actions[names[1]].stop();
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: false }));
          actions[names[1]].stop();
          break;
        case "Space":
          setKeysPressed((prev) => ({ ...prev, jump: false }));
          actions[names[2]].stop();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [actions, names, index]);

  useFrame(() => {
    let newVelocity = { ...velocity };

    if (keysPressed.forward) newVelocity.z = -0.05;
    if (keysPressed.backward) newVelocity.z = 0.05;
    if (keysPressed.leftward) newVelocity.x = -0.05;
    if (keysPressed.rightward) newVelocity.x = 0.05;
    if (keysPressed.jump && !newVelocity.isJumping) {
      newVelocity.y = 0.1;
      newVelocity.isJumping = true;
    }

    newVelocity.y -= 0.005;

    if (ref.current) {
      ref.current.position.x += newVelocity.x;
      ref.current.position.y += newVelocity.y;
      ref.current.position.z += newVelocity.z;

      newVelocity.x = 0;
      newVelocity.z = 0;

      if (ref.current.position.y < 0) {
        ref.current.position.y = 0;
        newVelocity.y = 0;
        newVelocity.isJumping = false;
      }
    }

    setVelocity(newVelocity);
  });

  useEffect(() => {
    actions[names[index]].play();
    return () => actions[names[index]].stop();
  }, [index, actions, names]);

  return (
    <primitive
      rotation-y={3}
      object={scene}
      ref={ref}
      scale={1}
      position={position}
    />
  );
}
