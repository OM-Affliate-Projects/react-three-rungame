import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const sounds = {};
  let backgroundMusic = null;

  useEffect(() => {
    loadSound('jump', 'sounds/jump.mp3');
    loadSound('collision', 'sounds/collision.mp3');
    loadSound('background', 'sounds/background.mp3');
    loadSound('move', 'sounds/move.mp3');

    playBackgroundMusic('background');

    return () => {
      if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic = null;
      }
    };
  }, []);

  const loadSound = (name, url) => {
    const audio = new Audio(url);
    sounds[name] = audio;
  };

  const playSound = (name) => {
    if (sounds[name]) {
      sounds[name].currentTime = 0;
      sounds[name].play();
    }
  };

  const playBackgroundMusic = (name) => {
    if (sounds[name]) {
      backgroundMusic = sounds[name];
      backgroundMusic.loop = true;
      backgroundMusic.play();
    }
  };

  return (
    <AppContext.Provider value={{ playSound }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
