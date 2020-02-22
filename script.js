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

var J1boost;
var J1sauveboost;
var J2right;
var J2down;
var J2left;
var J2right;
var J2boost;
var J2sauveboost;
var score1 = 0;
var score2 = 0;
var bonusapparition;

function init() {
  var platforms;
  var player1;
  var head1;
  var player2;
  var head2;
  var cursors;
  var textjoueur1;
  var textjoueur2;
  var textscore1;
  var textscore2;
  var textj1gagnant;
  var textj2gagnant;
}




function preload() {

  // plateformes
  this.load.image('plateforme1','assets/plateforme.jpg');
  this.load.image('plateforme2','assets/plateforme.jpg');
  this.load.image('plateforme3','assets/plateforme.jpg');
  this.load.image('plateforme4','assets/plateforme.jpg');
  this.load.image('plateforme5','assets/plateforme.jpg');
  this.load.image('plateforme6','assets/plateforme.jpg');
  this.load.image('plateforme7','assets/plateforme.jpg');
  this.load.image('plateforme8','assets/plateforme.jpg');
  this.load.image('plateforme9','assets/plateforme.jpg');
  this.load.image('plateforme10','assets/plateforme.jpg');
  this.load.image('plateforme11','assets/plateforme.jpg');

  // joueur 1
  this.load.image('head1','assets/head.png');
  this.load.spritesheet('stop','assets/stop.png',{frameWidth: 20, frameHeight: 30});
  this.load.spritesheet('run','assets/run.png',{frameWidth: 21.8, frameHeight: 30});
  this.load.spritesheet('jump','assets/jump.png',{frameWidth: 25, frameHeight: 25});

  // joueur 2
  this.load.image('head2','assets/head2.png');
  this.load.spritesheet('stop2','assets/stop2.png',{frameWidth: 20, frameHeight: 30});
  this.load.spritesheet('run2','assets/run2.png',{frameWidth: 21.8, frameHeight: 30});
  this.load.spritesheet('jump2','assets/jump2.png',{frameWidth: 25, frameHeight: 25});

  // item collectable
  this.load.image('itemcollect','assets/itemcollect.png');
  this.load.image('itemscore','assets/itemscore.png');

  // bonus
  this.load.image('bonus','assets/bonus.png');


  // joueur 2
  this.load.image('head2','assets/head2.png');
  this.load.spritesheet('stop2','assets/stop2.png',{frameWidth: 20, frameHeight: 30});
  this.load.spritesheet('run2','assets/run2.png',{frameWidth: 21.8, frameHeight: 30});
  this.load.spritesheet('jump2','assets/jump2.png',{frameWidth: 25, frameHeight: 25});

  // item collectable
  this.load.image('itemcollect','assets/itemcollect.png');
  this.load.image('itemscore','assets/itemscore.png');

}



function create() {

  // plateformes
  platforms = this.physics.add.staticGroup();
  platforms.create(100,609,'plateforme1');
  platforms.create(400,500,'plateforme2');
  platforms.create(700,390,'plateforme3');
  platforms.create(400,290,'plateforme4');
  platforms.create(700,190,'plateforme5');
  platforms.create(400,90,'plateforme6');
  platforms.create(700,609,'plateforme7');
  platforms.create(100,390,'plateforme8');
  platforms.create(100,190,'plateforme9');
  platforms.create(500,609,'plateforme10');
  platforms.create(300,609,'plateforme11');

  // joueur 1
  this.add.image(20, 15, 'head1');
  textjoueur1 = this.add.text(40, 10, 'Joueur 1', { fontSize: '15px', fill: '#fff' });
  this.add.image(21, 40, 'itemscore');
  textscore1 = this.add.text(40, 33, '0', { fontSize: '15px', fill: '#fff' });
  player1 = this.physics.add.sprite(775,560,'stop');
  player1.setFlipX(true);
  player1.setCollideWorldBounds(true);
  this.physics.add.collider(player1,platforms);
  //player1.setBounce(0.1);
  player1.body.setGravityY(500);

  // joueur 2
  this.add.image(780, 15, 'head2');
  textjoueur2 = this.add.text(690, 10, 'Joueur 2', { fontSize: '15px', fill: '#fff' });
  this.add.image(781, 40, 'itemscore');
  textscore2 = this.add.text(753, 33, '0', { fontSize: '15px', fill: '#fff' });
  player2 = this.physics.add.sprite(25,560,'stop2');
  player2.setFlipX(false);
  player2.setCollideWorldBounds(true);
  this.physics.add.collider(player2,platforms);
  //player2.setBounce(0.1);
  player2.body.setGravityY(500);

  // animation stop joueur 1
  this.anims.create ({
    key: 'stop',
    frames: this.anims.generateFrameNumbers('stop'),
    frameRate: 10,
    repeat: -1
  })

  // animation course joueur 1
  this.anims.create ({
    key: 'run',
    frames: this.anims.generateFrameNumbers('run'),
    frameRate: 10,
    repeat: -1
  })

  // animation saut joueur 1
  this.anims.create ({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('jump'),
    frameRate: 10,
    repeat: -1
  })

  // animation stop joueur 2
  this.anims.create ({
    key: 'stop2',
    frames: this.anims.generateFrameNumbers('stop2'),
    frameRate: 10,
    repeat: -1
  })

  // animation course joueur 2
  this.anims.create ({
    key: 'run2',
    frames: this.anims.generateFrameNumbers('run2'),
    frameRate: 10,
    repeat: -1
  })

  // animation saut joueur 2
  this.anims.create ({
    key: 'jump2',
    frames: this.anims.generateFrameNumbers('jump2'),
    frameRate: 10,
    repeat: -1
  })

  // touches
  cursors = this.input.keyboard.createCursorKeys();
  J1boost = this.input.keyboard.addKey('J');
  J2up = this.input.keyboard.addKey('Z');
  J2down = this.input.keyboard.addKey('S');
  J2left = this.input.keyboard.addKey('Q');
  J2right = this.input.keyboard.addKey('D');
  J2boost = this.input.keyboard.addKey('A');

  // items
  itemcollect = this.physics.add.group({
    key: 'itemcollect',
    repeat: 15,
    setXY: { x: 25, y: -10, stepX: 50 }
});

  itemcollect.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.9, 1));
    child.setBounceX(Phaser.Math.FloatBetween(1, 1.1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);

});

this.physics.add.collider(player1, player2);
this.physics.add.collider(itemcollect, platforms);

this.physics.add.overlap(player1, itemcollect, collectingitem1, null, this);
this.physics.add.overlap(player2, itemcollect, collectingitem2, null, this);

function collectingitem1 (player1, itemcollect) {
    itemcollect.disableBody(true, true);

    score1 += 1;
    textscore1.setText(score1);

}

function collectingitem2 (player2, itemcollect) {
    itemcollect.disableBody(true, true);

    score2 += 1;
    textscore2.setText(score2);
}


}



function update() {

  // réapparition des items
  if (itemcollect.countActive(true) === 0) {
      var rdmy = Phaser.Math.Between(-50, 570);
      itemcollect = this.physics.add.group({
        key: 'itemcollect',
        repeat: 15,
        setXY: { x: 25, y: rdmy, stepX: 50 },
      });
      this.physics.add.collider(itemcollect, platforms);
      this.physics.add.overlap(player1, itemcollect, collectingitem1, null, this);
      this.physics.add.overlap(player2, itemcollect, collectingitem2, null, this);
      itemcollect.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.9, 1));
        child.setBounceX(Phaser.Math.FloatBetween(1, 1.1));
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
        child.setCollideWorldBounds(true);

    });
  }

  // le joueur 1 gagne
  if (score1 === 100) {
    this.physics.pause();
    player1.setTint(0x00ff00);
    player2.setTint(0xff0000);
    gameOver = true;
    textj1gagnant = this.add.text(90, 300, 'Le Joueur 1 a gagné !', { fontSize: '50px', fill: '#fff' });
  }
  // le joueur 2 gagne
  if (score2 === 100) {
    this.physics.pause();
    player2.setTint(0x00ff00);
    player1.setTint(0xff0000);
    gameOver = true;
    textj1gagnant = this.add.text(90, 300, 'Le Joueur 2 a gagné !', { fontSize: '50px', fill: '#fff' });
  }

  // scores update
  function collectingitem1 (player1, itemcollect) {
      itemcollect.disableBody(true, true);

      score1 += 1;
      textscore1.setText(score1);

  }

  function collectingitem2 (player2, itemcollect) {
      itemcollect.disableBody(true, true);

      score2 += 1;
      textscore2.setText(score2);
  }

  // joueur 1
  if (cursors.right.isDown) {
    player1.setVelocityX(300);
    player1.anims.play('run', true);
    player1.setFlipX(false);
  }

  // réapparition des items
  if (itemcollect.countActive(true) === 0) {
      var rdmy = Phaser.Math.Between(-50, 570);
      itemcollect = this.physics.add.group({
        key: 'itemcollect',
        repeat: 15,
        setXY: { x: 25, y: rdmy, stepX: 50 },
      });
      this.physics.add.collider(itemcollect, platforms);
      this.physics.add.overlap(player1, itemcollect, collectingitem1, null, this);
      this.physics.add.overlap(player2, itemcollect, collectingitem2, null, this);
      itemcollect.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.9, 1));
        child.setBounceX(Phaser.Math.FloatBetween(1, 1.1));
        child.setVelocity(Phaser.Math.Between(-200, 200), 30);
        child.setCollideWorldBounds(true);

    });
  }

  // apparition bonus
/*  if (score1 === 50 || score2 === 50) {
    bonusapparition = 1;
  }
  if (bonusapparition === 1) {
    var bonusrdmx = Phaser.Math.Between(20, 780);
    var bonusrdmy = Phaser.Math.Between(20, 560);
    bonus = this.physics.add.group({
      key: 'bonus',
      repeat: 0,
      setXY: { x: bonusrdmx, y: bonusrdmy},
    });
    this.physics.add.overlap(player1, bonus, collectingbonus1, null, this);
    this.physics.add.overlap(player2, bonus, collectingbonus2, null, this);

  }*/

  // le joueur 1 gagne
  if (score1 === 100) {
    this.physics.pause();
    player1.setTint(0x00ff00);
    player2.setTint(0xff0000);
    gameOver = true;
    textj1gagnant = this.add.text(90, 300, 'Le Joueur 1 a gagné !', { fontSize: '50px', fill: '#fff' });
  }
  // le joueur 2 gagne
  if (score2 === 100) {
    this.physics.pause();
    player2.setTint(0x00ff00);
    player1.setTint(0xff0000);
    gameOver = true;
    textj1gagnant = this.add.text(90, 300, 'Le Joueur 2 a gagné !', { fontSize: '50px', fill: '#fff' });
  }

  // scores update
  function collectingitem1 (player1, itemcollect) {
      itemcollect.disableBody(true, true);

      score1 += 1;
      textscore1.setText(score1);

  }

  function collectingitem2 (player2, itemcollect) {
      itemcollect.disableBody(true, true);

      score2 += 1;
      textscore2.setText(score2);
  }

  // joueur 1
  if (J1boost.isUp) {
    J1sauveboost = 1;
  }
  if (cursors.right.isDown) {
    if (J1boost.isDown && J1sauveboost == 1) {
      J1sauveboost = 0;
      player1.setVelocityX(5000);
      player1.anims.play('run', true);
      player1.setFlipX(false);
    } else {
      player1.setVelocityX(300);
      player1.anims.play('run', true);
      player1.setFlipX(false);
    }
  } else if (cursors.left.isDown) {
    if (J1boost.isDown && J1sauveboost == 1) {
      J1sauveboost = 0;
      player1.setVelocityX(-5000);
      player1.anims.play('run', true);
      player1.setFlipX(true);
    } else {
      player1.setVelocityX(-300);
      player1.anims.play('run', true);
      player1.setFlipX(true);
    }
  } else {
    player1.setVelocityX(0);
    if (player1.body.touching.down) {
    player1.setVelocityX(0);
    player1.anims.play('stop', true);
    }
  }

  if (cursors.up.isDown && player1.body.touching.down) {
    player1.setVelocityY(-600);
  } else if (cursors.down.isDown && !player1.body.touching.down) {
    player1.setVelocityY(2000);
    player1.anims.play('stop', true);
  }
  if (cursors.up.isDown && !player1.body.touching.down) {
    player1.anims.play('jump', true);
  }


  // joueur 2
  if (J2boost.isUp) {
    J2sauveboost = 1;
  }
  if (J2right.isDown) {
    if (J2boost.isDown && J2sauveboost == 1) {
      J2sauveboost = 0;
      player2.setVelocityX(5000);
      player2.anims.play('run', true);
      player2.setFlipX(false);
    } else {
      player2.setVelocityX(300);
      player2.anims.play('run2', true);
      player2.setFlipX(false);
    }
  } else if (J2left.isDown) {
    if (J2boost.isDown && J2sauveboost == 1) {
      J2sauveboost = 0;
      player2.setVelocityX(-5000);
      player2.anims.play('run', true);
      player2.setFlipX(true);
    } else {
      player2.setVelocityX(-300);
      player2.anims.play('run2', true);
      player2.setFlipX(true);
    }
  } else {
    player2.setVelocityX(0);
    if (player2.body.touching.down) {
    player2.setVelocityX(0);
    player2.anims.play('stop2', true);
    }
  }

  if (J2up.isDown && player2.body.touching.down) {
    player2.setVelocityY(-600);
  } else if (J2down.isDown && !player2.body.touching.down) {
    player2.setVelocityY(2000);
    player2.anims.play('stop2', true);
  }
  if (J2up.isDown && !player2.body.touching.down) {
    player2.anims.play('jump2', true);
  }
}
