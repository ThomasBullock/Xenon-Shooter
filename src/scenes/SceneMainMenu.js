export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  create() {
    console.log("SceneMainMenu create");
    this.scene.start("SceneMain");
  }
}
