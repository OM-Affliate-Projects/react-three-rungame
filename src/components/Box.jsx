// Boilerplate test-code

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Box({ color, args }) {
  const mesh = useRef();
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [keysPressed, setKeysPressed] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          setKeysPressed((prev) => ({ ...prev, forward: true }));
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: true }));
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: true }));
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: true }));
          break;
        case "Space":
          setKeysPressed((prev) => ({ ...prev, jump: true }));
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
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: false }));
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: false }));
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: false }));
          break;
        case "Space":
          setKeysPressed((prev) => ({ ...prev, jump: false }));
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
  }, []);

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

    // Apply gravity
    newVelocity.y -= 0.005;

    // Update position
    mesh.current.position.x += newVelocity.x;
    mesh.current.position.y += newVelocity.y;
    mesh.current.position.z += newVelocity.z;

    // Reset velocity for x and z to prevent continuous movement
    newVelocity.x = 0;
    newVelocity.z = 0;

    // Simple ground collision detection to stop falling
    if (mesh.current.position.y < 0) {
      mesh.current.position.y = 0;
      newVelocity.y = 0;
      newVelocity.isJumping = false;
    }

    setVelocity(newVelocity);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
