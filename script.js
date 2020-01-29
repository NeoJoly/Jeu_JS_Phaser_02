var config = {
  type: Phaser.AUTO,
  width: 1520,
  height: 950,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 1000},
      debug: true
    }
  },
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update
  }
}

var game = new Phaser.Game(config);

function init() {
  var platforms;
  var player1;
  var cursors;
}

function preload() {
//  this.load.image('background','assets/background.jpg');
  this.load.image('sol','assets/sol.jpg');
  // plateformes de type 1
  this.load.image('platform11','assets/platform1.jpg');
  this.load.image('platform12','assets/platform1.jpg');
  // plateformes de type 2
  this.load.image('platform21','assets/platform2.jpg');
  this.load.image('platform22','assets/platform2.jpg');
  this.load.image('platform23','assets/platform2.jpg');
  // plateformes de type 3
  this.load.image('platform31','assets/platform3.jpg');
  this.load.image('platform32','assets/platform3.jpg');
  this.load.image('platform33','assets/platform3.jpg');
  this.load.image('platform34','assets/platform3.jpg');
  this.load.image('platform35','assets/platform3.jpg');
  // joueur 1
  this.load.image('perso1','assets/persotest.jpg')
}

function create() {
//  this.add.image(760,475,'background');
  platforms = this.physics.add.staticGroup();
  // plateforme sol
  platforms.create(760,925,'sol');
  // plateformes de type 1
  platforms.create(350,700,'platform11');
  platforms.create(1170,275,'platform12');
  // plateformes de type 2
  platforms.create(760,475,'platform21');
  platforms.create(325,375,'platform22');
  platforms.create(1150,650,'platform23');
  // plateformes de type 3
  platforms.create(1400,100,'platform31');
  platforms.create(1300,450,'platform32');
  platforms.create(102,550,'platform33');
  platforms.create(550,200,'platform34');
  platforms.create(850,800,'platform35');
  // joueur 1
  player1 = this.physics.add.sprite(100,850,'perso1');
  player1.setCollideWorldBounds(true);
  this.physics.add.collider(player1,platforms);
  player1.setBounce(0.1);
  player1.body.setGravityY(300);
  // touches
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if(cursors.left.isDown) {
    player1.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    player1.setVelocityX(300);
  } else {
    player1.setVelocityX(0);
  }

  if(cursors.up.isDown && player1.body.touching.down) {
    player1.setVelocityY(-700);
  } else if (cursors.down.isDown) {
    player1.setVelocityY(700);
  }
}
