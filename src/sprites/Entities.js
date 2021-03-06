import Phaser from "phaser";
import { getRandomArbitrary } from "../helpers/helpers.js";

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
    this.setData("direction", null);
  }

  explode(canDestroy) {
    console.log("explode", this.body, canDestroy);
    // debugger;
    if (!this.getData("isDead")) {
      // Set the texture to the explosion image, then play the animation
      this.setTexture("explosion"); // this refers to the same animation key we used when we added this.anims.create previously
      this.setScale(getRandomArbitrary(0.8, 1.1));
      this.play("explosion"); // play the animation

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 100);

      this.on(
        "animationcomplete",
        function () {
          if (canDestroy) {
            this.destroy();
          } else {
            this.setVisible(false);
          }
        },
        this
      );

      this.setData("isDead", true);
    }
  }
}

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "Player");

    this.setScale(0.5);

    this.setData("speed", 200);
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    this.setData("isBankingLeft", false);
    this.setData("isBankingRight", false);
    this.setData("isMoving", null);

    this.play("sprPlayer");
  }

  bankLeft() {
    this.setData("isBankingLeft", true);
    this.setData("isBankingRight", false);
    this.play("sprPlayerBankLeft");
  }

  bankRight() {
    console.log("BankRight");
    this.setData("isBankingLeft", false);
    this.setData("isBankingRight", true);
    this.play("sprPlayerBankRight");
  }

  straighten() {
    if (
      this.anims.isPlaying &&
      this.anims.currentAnim.key === "sprPlayerBankLeft"
    ) {
      this.setData("isBankingLeft", false);
      this.play("sprPlayer");
    }

    if (
      this.anims.isPlaying &&
      this.anims.currentAnim.key === "sprPlayerBankRight"
    ) {
      this.setData("isBankingRight", false);
      this.play("sprPlayer");
    }

    if (this.getData("isMoving") === "left") {
      this.play("sprPlayerCenterLeft");
      this.setData("isMoving", null);
      // this.setData("isBankingLeft", false);
    } else if (this.getData("isMoving") === "right") {
      this.play("sprPlayerCenterRight");
      this.setData("isMoving", null);
      // this.setData("isBankingRight", false);
    }
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }

  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }

  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    // Shooting
    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else {
        // when the "manual timer" is triggered:
        var laser = new PlayerLaser(this.scene, this.x, this.y - 50);
        laser.setScale(this.scaleX);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData("timerShootTick", 0);
      }
    }
  }
}

export class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "player_bullet");
    this.body.velocity.y = -300;
  }
}

export class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy1", "ChaserShip");

    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.setScale(0.5);
    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE",
    };
    this.state = this.states.MOVE_DOWN;
    this.play("sprEnemy1");
  }

  onDestroy() {
    this.body.setVelocity(0, 0);
  }

  update() {
    if (!this.getData("isDead") && this.scene.player) {
      if (
        Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.scene.player.x,
          this.scene.player.y
        ) < 320
      ) {
        this.state = this.states.CHASE;
      }

      if (this.state == this.states.CHASE) {
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        const angle = Math.atan2(dy, dx);

        const speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      }
    }
  }
}

export class GunShip extends Entity {
  constructor(scene, x, y, speed) {
    super(scene, x, y, "sprEnemy0", "GunShip");
    this.setScale(0.5);
    this.play("sprEnemy0");

    this.body.velocity.y = speed;

    this.shootTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: function () {
        const laser = new EnemyLaser(this.scene, this.x, this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    console.log("ON DESTROY", this.body);
    this.body.setVelocity(0, 0);
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy_2", "CarrierShip");
    this.play("enemy_2");
    this.setScale(0.5);
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }

  onDestroy() {
    this.body.setVelocity(0, 0);
  }
}

export class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserEnemy0");

    this.flipY = true;
    this.play("sprLaserEnemy0");
    this.body.velocity.y = 200;
  }
}

export class ScrollingBackground {
  constructor(scene, key, velocityY) {
    this.scene = scene;
    this.key = key;
    this.velocityY = velocityY;
    this.layers = this.scene.add.group();

    this.createLayers();
  }

  createLayers() {
    for (var i = 0; i < 2; i++) {
      // creating two backgrounds will allow a continuous scroll
      var layer = this.scene.add.sprite(0, 0, this.key);
      layer.y = layer.displayHeight * i;
      var flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      var flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      layer.setScale(flipX * 3.4, flipY * 2.9);
      layer.setDepth(-5 - (i - 1));
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.y = this.velocityY;

      this.layers.add(layer);
    }
  }

  update() {
    if (this.layers.getChildren()[0].y > 0) {
      for (var i = 0; i < this.layers.getChildren().length; i++) {
        var layer = this.layers.getChildren()[i];
        layer.y = -layer.displayHeight + layer.displayHeight * i;
      }
    }
  }
}
