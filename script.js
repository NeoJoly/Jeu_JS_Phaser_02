var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 1000},
      debug: false
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
  //this.load.image('background','assets/background.jpg');

  // plateformes
  this.load.image('plateforme1','assets/plateforme.jpg');
  this.load.image('plateforme2','assets/plateforme.jpg');
  this.load.image('plateforme3','assets/plateforme.jpg');
  this.load.image('plateforme4','assets/plateforme.jpg');
  this.load.image('plateforme5','assets/plateforme.jpg');
  this.load.image('plateforme6','assets/plateforme.jpg');

  // fausses plateformes
  this.load.image('fausseplateforme1','assets/fausseplateforme.jpg');
  this.load.image('fausseplateforme2','assets/fausseplateforme.jpg');
  this.load.image('fausseplateforme3','assets/fausseplateforme.jpg');
  this.load.image('fausseplateforme4','assets/fausseplateforme.jpg');
  this.load.image('fausseplateforme5','assets/fausseplateforme.jpg');

  // joueur 1
  this.load.spritesheet('stop','assets/stop.png',{frameWidth: 20, frameHeight: 30});
  this.load.spritesheet('run','assets/run.png',{frameWidth: 21.8, frameHeight: 30});
  this.load.spritesheet('jump','assets/jump.png',{frameWidth: 25, frameHeight: 25});
}




function create() {
  //this.add.image(760,475,'background');
  platforms = this.physics.add.staticGroup();

  // placement plateformes
  platforms.create(100,590,'plateforme1');
  platforms.create(400,490,'plateforme2');
  platforms.create(700,390,'plateforme3');
  platforms.create(400,290,'plateforme4');
  platforms.create(700,190,'plateforme5');
  platforms.create(400,90,'plateforme6');

  // placement fausses plateformes
  platforms.create(700,590,'fausseplateforme1');
  platforms.create(100,390,'fausseplateforme2');
  platforms.create(100,190,'fausseplateforme3');
  platforms.create(500,590,'fausseplateforme4');
  platforms.create(300,590,'fausseplateforme5');

  // joueur 1
  player1 = this.physics.add.sprite(100,400,'run');
  player1.setCollideWorldBounds(true);
  this.physics.add.collider(player1,platforms);
  //player1.setBounce(0.1);
  player1.body.setGravityY(500);

  // animation stop
  this.anims.create ({
    key: 'stop',
    frames: this.anims.generateFrameNumbers('stop'),
    frameRate: 10,
    repeat: -1
  })

  // animation course
  this.anims.create ({
    key: 'run',
    frames: this.anims.generateFrameNumbers('run'),
    frameRate: 10,
    repeat: -1
  })

  // animation saut
  this.anims.create ({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('jump'),
    frameRate: 10,
    repeat: -1
  })

  // touches
  cursors = this.input.keyboard.createCursorKeys();
}




function update() {
  if(cursors.right.isDown) {
    player1.setVelocityX(300);
    player1.anims.play('run', true);
    player1.setFlipX(false);
  } else if (cursors.left.isDown) {
    player1.setVelocityX(-300);
    player1.anims.play('run', true);
    player1.setFlipX(true);
  } else {
    player1.setVelocityX(0);
    if (player1.body.touching.down) {
    player1.setVelocityX(0);
    player1.anims.play('stop', true);
    }
  }

  if(cursors.up.isDown && player1.body.touching.down) {
    player1.setVelocityY(-575);
  } else if (cursors.down.isDown && !player1.body.touching.down) {
    player1.setVelocityY(2000);
    player1.anims.play('stop', true);
  }
  if (cursors.up.isDown && !player1.body.touching.down) {
    player1.anims.play('jump', true);
  }
}
