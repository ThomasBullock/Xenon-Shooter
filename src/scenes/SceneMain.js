import {
  Player,
  PlayerLaser,
  ChaserShip,
  GunShip,
  CarrierShip,
} from "../sprites/Entities.js";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }
  preload() {
    this.load.image("sprBg0", "src/assets/images/sprBg0.png");

    this.load.spritesheet(
      "sprExplosion",
      "src/assets/images/sprExplosion.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.spritesheet("sprEnemy0", "src/assets/images/ship_1.png", {
      frameWidth: 190,
      frameHeight: 208,
    });

    this.load.spritesheet("sprEnemy1", "src/assets/images/ship_3.png", {
      frameWidth: 251,
      frameHeight: 327,
    });

    this.load.spritesheet("sprEnemy2", "src/assets/images/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet(
      "sprLaserEnemy0",
      "src/assets/images/bullet_pink_strip8.png",
      {
        frameWidth: 48,
        frameHeight: 51,
      }
    );
    this.load.image("sprLaserPlayer", "src/assets/images/sprLaserPlayer.png");

    this.load.spritesheet(
      "sprPlayer",
      "src/assets/images/ship_4_update_green_strip17.png",
      {
        frameWidth: 178,
        frameHeight: 153,
      }
    );

    // Load Sounds
    this.load.audio("sndExplode0", "src/assets/audio/sndExplode0.wav");
    this.load.audio("sndExplode1", "src/assets/audio/sndExplode1.wav");
    this.load.audio("sndLaser", "src/assets/audio/sndLaser.wav");
  }
  create() {
    var isLargeScreen = this.registry.get("isLargeScreen");
    console.log("isLargeScreen", isLargeScreen);
    this.add.image(480, 640, "sprBg0");

    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "sprEnemy1",
      frames: this.anims.generateFrameNumbers("sprEnemy1"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "sprLaserEnemy0",
      frames: this.anims.generateFrameNumbers("sprLaserEnemy0"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [8, 9, 8, 7],
      }),
      frameRate: 5,
      repeat: -1,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerBankLeft",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [8, 9, 10, 11, 12, 13, 14, 15],
      }),
      startFrame: 8,
      frameRate: 20,
      repeat: 0,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerCenterLeft",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [14, 13, 12, 11, 10, 9],
      }),
      startFrame: 14,
      frameRate: 20,
      repeat: 0,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerBankRight",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [8, 7, 6, 5, 4, 3, 2, 1],
      }),
      startFrame: 8,
      frameRate: 20,
      repeat: 0,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerCenterRight",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [2, 3, 4, 5, 6, 7, 2],
      }),
      startFrame: 2,
      frameRate: 20,
      repeat: 0,
      duration: null,
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1"),
      ],
      laser: this.sound.add("sndLaser"),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );

    /* Keyboard Input */
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.player.on(
      "animationcomplete-sprPlayerCenterRight",
      function (currentAnim, currentFrame, sprite) {
        sprite.play("sprPlayer");
      }
    );

    this.player.on(
      "animationcomplete-sprPlayerCenterLeft",
      function (currentAnim, currentFrame, sprite) {
        sprite.play("sprPlayer");
      }
    );

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function () {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          // enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.update();
    // if (this.cursorKeys.left._justDown) {
    //   console.log("leftty");
    //   this.player.bankLeft();
    // } else if (this.cursorKeys.right._justDown) {
    //   this.player.bankRight();
    // }

    if (this.cursorKeys.up.isDown) {
      this.player.moveUp();
    } else if (this.cursorKeys.down.isDown) {
      this.player.moveDown();
    }

    if (this.cursorKeys.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursorKeys.right.isDown) {
      this.player.moveRight();
    }

    if (
      this.cursorKeys.up.isUp ||
      this.cursorKeys.down.isUp ||
      this.cursorKeys.left.isUp ||
      this.cursorKeys.right.isUp
    ) {
      this.player.resetMovement();
    }

    if (this.keySpace.isDown) {
      this.player.setData("isShooting", true);
      console.log(this.playerLasers.getChildren().length);
    } else {
      this.player.setData(
        "timerShootTick",
        this.player.getData("timerShootDelay") - 1
      );
      this.player.setData("isShooting", false);
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}
