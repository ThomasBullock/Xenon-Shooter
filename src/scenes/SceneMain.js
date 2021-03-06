import {
  Player,
  PlayerLaser,
  ChaserShip,
  GunShip,
  CarrierShip,
  ScrollingBackground,
} from "../sprites/Entities.js";

import { FX, PROJECTILES, ENEMIES, LEVELS } from "../helpers/constants.js";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }
  preload() {
    this.load.image("sprBg0", "src/assets/images/sprBg0.png");

    PROJECTILES.forEach((item) => {
      this.load.spritesheet(item.key, `src/assets/images/${item.file}`, {
        frameWidth: item.frame[0],
        frameHeight: item.frame[1],
      });
    });

    FX.forEach((item) => {
      this.load.spritesheet(item.key, `src/assets/images/${item.file}`, {
        frameWidth: item.frame[0],
        frameHeight: item.frame[1],
      });
    });

    ENEMIES.forEach((item) => {
      this.load.spritesheet(item.key, `src/assets/images/${item.file}`, {
        frameWidth: item.frame[0],
        frameHeight: item.frame[1],
      });
    });

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

    // this.load.image("sprLaserPlayer", "src/assets/images/sprLaserPlayer.png");

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
    // console.log("isLargeScreen", isLargeScreen);
    this.add.image(480, 640, "sprBg0");

    FX.forEach((item) => {
      this.anims.create({
        key: item.key,
        frames: this.anims.generateFrameNumbers(item.key),
        frameRate: item.frameRate ? item.frameRate : 20,
        repeat: item.repeat,
      });
    });

    PROJECTILES.forEach((item) => {
      this.anims.create({
        key: item.key,
        frames: this.anims.generateFrameNumbers(item.key),
        frameRate: item.frameRate ? item.frameRate : 20,
        repeat: item.repeat,
      });
    });

    ENEMIES.forEach((item) => {
      this.anims.create({
        key: item.key,
        frames: this.anims.generateFrameNumbers(item.key),
        frameRate: item.frameRate ? item.frameRate : 20,
        repeat: item.repeat,
      });
    });

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
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [8],
      }),
      frameRate: 5,
      repeat: -1,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerHardLeft",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [15],
      }),
      frameRate: 5,
      repeat: -1,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerHardRight",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [1],
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
        frames: [8, 9, 10, 11, 12, 13],
      }),
      startFrame: 8,
      frameRate: 25,
      repeat: 0,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerCenterLeft",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [12, 11, 10, 9],
      }),
      startFrame: 12,
      frameRate: 25,
      repeat: 0,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerBankRight",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [8, 7, 6, 5, 4, 3],
      }),
      startFrame: 8,
      frameRate: 25,
      repeat: 0,
      duration: null,
    });

    this.anims.create({
      key: "sprPlayerCenterRight",
      frames: this.anims.generateFrameNames("sprPlayer", {
        prefix: "",
        suffix: "",
        zeroPad: 0,
        frames: [4, 5, 6, 7, 8],
      }),
      startFrame: 4,
      frameRate: 25,
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

    this.levels = LEVELS[0];

    // this.time = 0;

    this.enemyEntities = {
      GUNSHIP: GunShip,
      CHASER_SHIP: ChaserShip,
      CARRIER_SHIP: CarrierShip,
    };

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      "sprPlayer"
    );

    /* Keyboard Input */
    // this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-" + "LEFT", (event) => {
      if (
        this.player.getData("isBankingLeft") ||
        this.player.getData("isMoving") === "left"
      ) {
        return;
      }
      // start banking left animation
      this.player.bankLeft();
      // then set isMoving Left
    });

    this.player.on(
      "animationcomplete-sprPlayerBankLeft",
      (currentAnim, currentFrame, sprite) => {
        this.player.setData("isBankingLeft", false);
        this.player.setData("isMoving", "left");
        // sprite.play("sprPlayer");
      }
    );

    this.input.keyboard.on("keyup-" + "LEFT", (event) => {
      console.log("bankingLeft " + this.player.getData("isBankingLeft"));
      console.log("bankingRight " + this.player.getData("isBankingRight"));
      if (!this.player.getData("isBankingRight")) {
        this.player.straighten();
      }
    });

    this.input.keyboard.on("keydown-" + "RIGHT", (event) => {
      if (
        this.player.getData("isBankingRight") ||
        this.player.getData("isMoving") === "right"
      ) {
        console.log("exit");
        return;
      }
      // start banking left animation
      this.player.bankRight();
    });

    this.player.on(
      "animationcomplete-sprPlayerBankRight",
      (currentAnim, currentFrame, sprite) => {
        this.player.setData("isBankingRight", false);
        this.player.setData("isMoving", "right");
      }
    );

    this.input.keyboard.on("keyup-" + "RIGHT", (event) => {
      if (!this.player.getData("isBankingLeft")) {
        this.player.straighten();
      }
    });

    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function () {
        let enemy = null;

        const event =
          this.time.now > this.levels[0]?.time ? this.levels.shift() : null;
        console.log(this.time.now);
        if (event) {
          enemy = new this.enemyEntities[event.sprite](
            this,
            this.game.config.width * event.x,
            0,
            event.speed
          );

          if (enemy !== null) {
            this.enemies.add(enemy);
          }
        }
      },

      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      function (playerLaser, enemy) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.explode(true);
          playerLaser.destroy();
        }
      }
    );

    this.physics.add.collider(
      this.enemyLasers,
      this.player,
      function (enemyLaser, player) {
        console.log(enemyLaser, player);
        enemyLaser.destroy();
        if (!player.getData("isDead")) {
          player.explode(false);
        }
      }
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      function (player, enemy) {
        if (!player.getData("isDead") && !enemy.getData("isDead")) {
          player.explode(false);
          enemy.explode(true);
        }
      }
    );
  }

  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();

      const moving = this.player.getData("isMoving");

      if (moving === "left" && !this.player.getData("isBankingRight")) {
        this.player.moveLeft();
      } else if (moving === "right" && !this.player.getData("isBankingLeft")) {
        this.player.moveRight();
      }

      // if (this.cursorKeys.up.isDown) {
      //   this.player.moveUp();
      // } else if (this.cursorKeys.down.isDown) {
      //   this.player.moveDown();
      // }

      // if (this.cursorKeys.left.isDown) {
      //   // this.player.moveLeft();
      // } else if (this.cursorKeys.right.isDown) {
      //   // this.player.moveRight();
      // }

      // if (
      //   this.cursorKeys.up.isUp ||
      //   this.cursorKeys.down.isUp ||
      //   this.cursorKeys.left.isUp ||
      //   this.cursorKeys.right.isUp
      // ) {
      //   this.player.resetMovement();
      // }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData(
          "timerShootTick",
          this.player.getData("timerShootDelay") - 1
        );
        this.player.setData("isShooting", false);
      }
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

    for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
      const laser = this.playerLasers.getChildren()[i];
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

    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}
