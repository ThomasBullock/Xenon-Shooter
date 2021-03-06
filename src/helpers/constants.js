export const PROJECTILES = [
  {
    key: "missle",
    file: "missle_1_plus_flame_strip18.png",
    frame: [44, 132],
    repeat: -1,
  },
  {
    key: "bomb",
    file: "missle_2_strip18.png",
    frame: [58, 105],
    repeat: -1,
  },
  {
    key: "player_bullet",
    file: "bullet_red_strip8.png",
    frame: [42, 46],
    repeat: -1,
  },
  {
    key: "sprLaserEnemy0",
    file: "bullet_pink_strip8.png",
    frame: [48, 51],
    repeat: -1,
  },
];

export const ENEMIES = [
  {
    key: "enemy_2",
    file: "ship_2.png",
    frame: [218, 242],
    repeat: -1,
  },
  {
    key: "enemy_2_shoot",
    file: "ship_2_shoot.png",
    frame: [294, 272],
    repeat: -1,
  },
];

export const FX = [
  {
    key: "explosion",
    file: "explosion.png",
    frame: [256, 248],
    repeat: 0,
    frameRate: 35,
  },
];

export const LEVELS = [
  [
    {
      sprite: "GUNSHIP",
      x: 0.3,
      speed: 50,
      time: 2000,
    },
    {
      sprite: "GUNSHIP",
      x: 0.5,
      speed: 50,
      time: 3000,
    },
    {
      sprite: "GUNSHIP",
      x: 0.7,
      speed: 50,
      time: 4000,
    },
    {
      sprite: "CHASER_SHIP",
      x: 0.1,
      speed: 60,
      time: 6000,
    },
    {
      sprite: "CHASER_SHIP",
      x: 0.9,
      speed: 70,
      time: 7000,
    },
    {
      sprite: "GUNSHIP",
      x: 0.6,
      speed: 50,
      time: 10000,
    },
    {
      sprite: "GUNSHIP",
      x: 0.4,
      speed: 50,
      time: 11000,
    },
    {
      sprite: "GUNSHIP",
      x: 0.2,
      speed: 50,
      time: 12000,
    },
    {
      sprite: "CARRIER_SHIP",
      x: 0.5,
      speed: 60,
      time: 15000,
    },
  ],
];
