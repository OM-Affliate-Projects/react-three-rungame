import { useState, useEffect } from "react";
import { Enemy } from "./";

/**
 * Mögliche Ursachen:
 * - Mapping
 * - Canvas
 * - spezifisches Tagelement zum darstellen von mehreren Elems
 */

export default function Enemies() {
  const [enemies, setEnemies] = useState([]);
  const [frames, setFrames] = useState(0);
  const [spawnRate, setSpawnRate] = useState(200);

  useEffect(() => {
    generateCurrentEnemies();
  }, []);

  useEffect(() => {
    generateCurrentEnemies();
  }, [frames]);

  const generateCurrentEnemies = () => {
    const getRandomXPosition = () => {
      return Math.random() * 10 - 5;
    };

    if (frames % spawnRate === 0) {
      if (spawnRate > 20) setSpawnRate(() => spawnRate - 20);
      const newEnemy = {
        id: Math.random(),
        x: getRandomXPosition(),
      };
      setEnemies(() => [...enemies, newEnemy]);
      setFrames(() => frames + 1);
    }
  };

  return (
    <>
      {enemies &&
        enemies.map((enemy) => <Enemy key={enemy.id} positionX={enemy.x} />)}
    </>
  );
}
