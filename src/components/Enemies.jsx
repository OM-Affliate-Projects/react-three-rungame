import { useState } from "react";
import { Enemy } from "./";

export default function Enemies() {
  const [enemies, setEnemies] = useState([]);
  const [frames, setFrames] = useState(0);
  const [spawnRate, setSpawnRate] = useState(200);

  if (frames % spawnRate === 0) {
    if (spawnRate > 20) setSpawnRate(() => spawnRate - 20);
    const enemy = <Enemy />;
    setEnemies(...enemies, enemy);
    setFrames(() => frames + 1);
  }

  return <></>;
}
