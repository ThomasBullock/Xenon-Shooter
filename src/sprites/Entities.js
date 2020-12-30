import Phaser from "phaser";

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
}

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "Player");

    this.setScale(0.5);
    this.setData("speed", 200);
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
  }
}

export class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy1", "ChaserShip");

    this.body.velocity.y = Phaser.Math.Between(50, 100);
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
        var laser = new EnemyLaser(this.scene, this.x, this.y);
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

export class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserEnemy0");

    this.flipY = true;
    this.play("sprLaserEnemy0");
    this.body.velocity.y = 200;
  }
}
