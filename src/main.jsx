import React, { useContext, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppProvider, AppContext } from './AppContext';

const Main = () => {
  const { playSound } = useContext(AppContext);

  useEffect(() => {
    let scene, camera, renderer, cube, controls;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      controls = new OrbitControls(camera, renderer.domElement);

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    function onKeyDown(event) {
      switch (event.keyCode) {
        case 32: // Space key
          playSound('jump');
          cube.position.y += 0.1;
          break;
        case 37: // Left arrow key
        case 38: // Up arrow key
        case 39: // Right arrow key
        case 40: // Down arrow key
          playSound('move');
          // Add logic to move the cube in the desired direction
          break;
        // Add more cases for other keys if necessary
      }
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    init();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [playSound]);

  return null;
};

const App = () => (
  <AppProvider>
    <Main />
  </AppProvider>
);

export default App;
