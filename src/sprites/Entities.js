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

  explode(val) {
    new Explosion(this.scene, this.x, this.y, "explosion");
    this.destroy();
  }
}

class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setScale(getRandomArbitrary(0.8, 1));
    this.play("explosion");
  }

  create() {
    this.on(
      "animationcomplete-explosion",
      function (currentAnim, currentFrame, sprite) {
        sprite.destroy();
      }
    );
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

    this.play("sprPlayer");
  }

  bankLeft() {
    console.log("satrt anim");
    this.play("sprPlayerBankLeft");
    this.setData("direction", "left");
  }

  bankRight() {
    this.play("sprPlayerBankRight");
    this.setData("direction", "right");
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }

  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }

  moveLeft() {
    if (this.getData("direction") !== "left") {
      this.bankLeft();
    }
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight() {
    if (this.getData("direction") !== "right") {
      this.bankRight();
    }
    this.body.velocity.x = this.getData("speed");
  }

  resetMovement() {
    // if (this.getData("direction") === "left") {
    //   this.play("sprPlayerCenterLeft");
    // } else if (this.getData("direction") === "right") {
    //   this.play("sprPlayerCenterRight");
    // }
    this.setData("direction", null);
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
        var laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData("timerShootTick", 0);
      }
    }
  }
}

export class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserPlayer");
    this.body.velocity.y = -200;
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
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy0", "GunShip");
    this.setScale(0.5);
    this.play("sprEnemy0");

    this.body.velocity.y = Phaser.Math.Between(50, 100);

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
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy2", "CarrierShip");
    this.play("sprEnemy2");
    this.setScale(0.5);
    this.body.velocity.y = Phaser.Math.Between(50, 100);
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
