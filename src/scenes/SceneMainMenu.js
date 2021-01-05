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
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnPlay"
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on(
      "pointerover",
      function () {
        this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnPlay.on("pointerout", function () {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on(
      "pointerdown",
      function () {
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnPlay.on(
      "pointerup",
      function () {
        this.btnPlay.setTexture("sprBtnPlay");
        this.scene.start("SceneMain");
      },
      this
    );

    let { width } = this.sys.game.canvas;
    const isLargeScreen = width > 640;
    console.log(isLargeScreen);
    this.registry.set("isLargeScreen", isLargeScreen);
    // this.scene.start("SceneMain");
  }
}
