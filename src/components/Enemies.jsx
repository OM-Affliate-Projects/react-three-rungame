import { useState, useEffect, useRef } from "react";
import { Enemy } from "./";
import { useFrame } from "@react-three/fiber";

export default function Enemies() {
  const [enemies, setEnemies] = useState([]);
  const [frames, setFrames] = useState(0);
  const [spawnRate, setSpawnRate] = useState(200);
  const spawnRateRef = useRef(spawnRate);

  useEffect(() => {
    spawnRateRef.current = spawnRate;
  }, [spawnRate]);

  useFrame(() => {
    setFrames((prevFrames) => prevFrames + 1);

    if (frames % spawnRateRef.current === 0) {
      if (spawnRate > 20) setSpawnRate((prevSpawnRate) => prevSpawnRate - 20);

      const newEnemy = {
        id: Math.random(),
        x: getRandomXPosition(),
      };

      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
    }
  });

  const getRandomXPosition = () => {
    return Math.random() * 10 - 5;
  };

  return (
    <>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} positionX={enemy.x} />
      ))}
    </>
  );
}
