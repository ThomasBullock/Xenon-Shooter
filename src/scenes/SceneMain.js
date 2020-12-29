export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }
  preload() {
    this.load.image("sprBg0", "src/assets/images/sprBg0.png");
    console.log("SceneMain Preload");
  }
  create() {
    this.add.image(480, 640, "sprBg0");
  }
}
