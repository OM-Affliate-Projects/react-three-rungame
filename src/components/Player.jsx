// import { useLoader } from "@react-three/fiber";
// import { useEffect, useState, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useGLTF, useAnimations } from "@react-three/drei";

// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export default function Player() {
//   const { nodes, animations } = useGLTF("/ReadiedAsset.glb");
//   const gltf = useLoader(GLTFLoader, "./ReadiedAsset.glb");
//   console.log(gltf);
//   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
//   const [keysPressed, setKeysPressed] = useState({
//     forward: false,
//     backward: false,
//     leftward: false,
//     rightward: false,
//     jump: false,
//   });

//   const { ref, actions, names } = useAnimations(animations);
//   console.log(animations);
//   console.log("Ref", ref);
//   console.log("Actions", actions);
//   console.log("Names", names);

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       switch (event.code) {
//         case "ArrowUp":
//         case "KeyW":
//           setKeysPressed((prev) => ({ ...prev, forward: true }));
//           actions[names[index]]?.play()
//           break;
//         case "ArrowDown":
//         case "KeyS":
//           setKeysPressed((prev) => ({ ...prev, backward: true }));
//           break;
//         case "ArrowLeft":
//         case "KeyA":
//           setKeysPressed((prev) => ({ ...prev, leftward: true }));
//           break;
//         case "ArrowRight":
//         case "KeyD":
//           setKeysPressed((prev) => ({ ...prev, rightward: true }));
//           break;
//         case "Space":
//           setKeysPressed((prev) => ({ ...prev, jump: true }));
//           break;
//         default:
//           break;
//       }
//     };

//     const handleKeyUp = (event) => {
//       switch (event.code) {
//         case "ArrowUp":
//         case "KeyW":
//           setKeysPressed((prev) => ({ ...prev, forward: false }));
//           break;
//         case "ArrowDown":
//         case "KeyS":
//           setKeysPressed((prev) => ({ ...prev, backward: false }));
//           break;
//         case "ArrowLeft":
//         case "KeyA":
//           setKeysPressed((prev) => ({ ...prev, leftward: false }));
//           break;
//         case "ArrowRight":
//         case "KeyD":
//           setKeysPressed((prev) => ({ ...prev, rightward: false }));
//           break;
//         case "Space":
//           setKeysPressed((prev) => ({ ...prev, jump: false }));
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, [actions, names, index]);

//   useFrame(() => {
//     let newVelocity = { ...velocity };

//     if (keysPressed.forward) newVelocity.z = -0.05;
//     if (keysPressed.backward) newVelocity.z = 0.05;
//     if (keysPressed.leftward) newVelocity.x = -0.05;
//     if (keysPressed.rightward) newVelocity.x = 0.05;
//     if (keysPressed.jump && !newVelocity.isJumping) {
//       newVelocity.y = 0.1;
//       newVelocity.isJumping = true;
//     }

//     // Apply gravity
//     newVelocity.y -= 0.005;

//     // Update position
//     ref.current.position.x += newVelocity.x;
//     ref.current.position.y += newVelocity.y;
//     ref.current.position.z += newVelocity.z;

//     // Reset velocity for x and z to prevent continuous movement
//     newVelocity.x = 0;
//     newVelocity.z = 0;

//     // Simple ground collision detection to stop falling
//     if (ref.current.position.y < 0) {
//       ref.current.position.y = 0;
//       newVelocity.y = 0;
//       newVelocity.isJumping = false;
//     }

//     setVelocity(newVelocity);
//   });

//   useEffect(() => {
//     actions[names[index]]?.play();
//     return () => actions[names[index]]?.stop();
//   }, [index, actions, names]);

//   const clickME = () => {
//     setIndex((prevIndex) => (prevIndex + 1) % names.length);
//     console.log(index);
//   };

//   return (
//     <>
//       <primitive
//         object={gltf.scene}
//         ref={ref}
//         scale={1}
//         onPointerDown={clickME}
//       />
//     </>
//   );
// }
import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Player() {
  const { nodes, animations } = useGLTF("/ReadiedAsset.glb");
  const gltf = useLoader(GLTFLoader, "./ReadiedAsset.glb");
  console.log(gltf);

  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [keysPressed, setKeysPressed] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    jump: false,
  });

  const { ref, actions, names } = useAnimations(animations);
  const modelRef = useRef();

  console.log(animations);
  console.log("Ref", ref);
  console.log("Actions", actions);
  console.log("Names", names);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          setKeysPressed((prev) => ({ ...prev, forward: true }));
          actions[names[1]]?.play();
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: true }));
          actions[names[1]]?.play();
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: true }));
          actions[names[1]]?.play();
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: true }));
          actions[names[1]]?.play();
          break;
        case "Space":
          setKeysPressed((prev) => ({ ...prev, jump: true }));
          actions[names[2]]?.play();
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
          actions[names[1]]?.stop();
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: false }));
          actions[names[1]]?.stop();
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: false }));
          actions[names[1]]?.stop();
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: false }));
          actions[names[1]]?.stop();
          break;
        case "Space":
          setKeysPressed((prev) => ({ ...prev, jump: false }));
          actions[names[2]]?.stop();
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

    // Apply gravity
    newVelocity.y -= 0.005;

    // Update position
    if (ref.current) {
      ref.current.position.x += newVelocity.x;
      ref.current.position.y += newVelocity.y;
      ref.current.position.z += newVelocity.z;

      // Reset velocity for x and z to prevent continuous movement
      newVelocity.x = 0;
      newVelocity.z = 0;

      // Simple ground collision detection to stop falling
      if (ref.current.position.y < 0) {
        ref.current.position.y = 0;
        newVelocity.y = 0;
        newVelocity.isJumping = false;
      }
    }

    setVelocity(newVelocity);
  });

  useEffect(() => {
    actions[names[index]]?.play();
    return () => actions[names[index]]?.stop();
  }, [index, actions, names]);

  const clickME = () => {
    setIndex((prevIndex) => (prevIndex + 1) % names.length);
    console.log(index);
  };

  return (
    <>
      <primitive
        object={gltf.scene}
        ref={ref}
        scale={1}
        onPointerDown={clickME}
      />
    </>
  );
}
