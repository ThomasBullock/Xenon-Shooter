export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }
  // initialize() {
  //   // Phaser.Scene.call(this, {key: 'play'});
  // }

  preload() {
    this.load.image("sprBtnPlay", "src/assets/images/sprBtnPlay.png");
    this.load.image("sprBtnPlayHover", "src/assets/images/sprBtnPlayHover.png");
    this.load.image("sprBtnPlayDown", "src/assets/images/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "src/assets/images/sprBtnRestart.png");
    this.load.image(
      "sprBtnRestartHover",
      "src/assets/images/sprBtnRestartHover.png"
    );
    this.load.image(
      "sprBtnRestartDown",
      "src/assets/images/sprBtnRestartDown.png"
    );

    this.load.audio("sndBtnOver", "src/assets/audio/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "src/assets/audio/sndBtnDown.wav");
  }

  create() {
    console.log("SceneMainMenu create");

    let { width } = this.sys.game.canvas;
    const isLargeScreen = width > 640;
    console.log(isLargeScreen);
    this.registry.set("isLargeScreen", isLargeScreen);
    this.scene.start("SceneMain");
  }
}
