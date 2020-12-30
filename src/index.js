import Phaser from "phaser";
import SceneMainMenu from "./scenes/SceneMainMenu.js";
import SceneMain from "./scenes/SceneMain.js";
import SceneGameOver from "./scenes/SceneGameOver.js";

// const window = window.innerHeight;

console.log(window.innerHeight);

const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth < 801 ? window.innerWidth : 800,
  height: window.innerHeight,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      gravity: { x: 0, y: 0 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config);
