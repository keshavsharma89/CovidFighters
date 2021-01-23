
var game = new Phaser.Game(1340, 550, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //preload for player selection starts
    game.load.atlasJSONHash('biden', '../assets/biden_spritesheet.png', '../assets/biden_spritesheet.json');
    game.load.atlasJSONHash('modi', '../assets/modi_spritesheet.png', '../assets/modi_spritesheet.json');
    game.load.image("avatar_bg", "../assets/avatar.jpeg");
    game.load.image("modi_label", "../assets/modi_label.png");
    game.load.image("biden_label", "../assets/biden_label.png");
    game.load.spritesheet("avatar_select", "../assets/avatar_select.png");
    game.load.spritesheet("start_game", "../assets/start_game.png");
    //preload for player selection starts

    game.load.image('backgroung', '../assets/Game_background.png');
    game.load.image('covid', '../assets/covid.png');
    game.load.image('sanitizer','../assets/sanitizer.png');
    game.load.spritesheet('modi_avatar', '../assets/modi1152.png', 127, 190);
    game.load.spritesheet('biden_avatar', '../assets/biden1152.png', 127, 190);
    game.load.atlasJSONHash('bat', '../assets/bat.png', '../assets/bat.json');
    game.load.image('spray', '../assets/spray.png');
    game.load.audio('spraySound', '../assets/SoundEffects/spray-sound.mp3');
    game.load.image('vaccine', '../assets/vaccine.png');
    game.load.image('coronavirus', '../assets/coronavirus.png');
}
var map;
var cursors;
var player;
var sprayButton;
var jumpTimer = 0;
var facing='';
var sanitizer;
var covid;
var spray;
var vaccine;
var bat;
var firingTimer = 0;
var selectedCharacter;
var start_game;
var biden_image;
var biden_label;
var modi_image;
var modi_label;
var select_avatar;
var spraySound;
function create(){

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.tileSprite(0, 0, 1320, 600 , 'avatar_bg');
  select_avatar = game.add.sprite((game.width /2)-150, 50, 'avatar_select');
  biden_image = game.add.sprite((game.width /2)-200, 150, 'biden');
  biden_label = game.add.sprite((game.width /2)-200, 400, 'biden_label');
  modi_image = game.add.sprite((game.width /2)+150, 150, 'modi');
  modi_label = game.add.sprite((game.width /2)+150, 400, 'modi_label');
  biden_image.animations.add('dance_biden');
  modi_image.animations.add('dance_modi');
  biden_image.inputEnabled = true;
  modi_image.inputEnabled = true;

  biden_image.animations.play('dance_biden', 30, true);
  modi_image.animations.play('dance_modi', 7, true);
  biden_image.events.onInputDown.add(selectCharacter);
  modi_image.events.onInputDown.add(selectCharacter);

  game.physics.arcade.enable(biden_image);
  game.physics.arcade.enable(modi_image);

}


function selectCharacter(item, pointer)
{
    this.selectedCharacter = item.key;
    this.select_avatar.kill();
    this.start_game = game.add.sprite((game.width /2)+40, game.height-100, 'start_game');
    this.start_game.anchor.set(0.5);
    this.start_game.inputEnabled = true;
    this.start_game.events.onInputDown.add(startGame);
    if(item.key == 'modi')
    {
      this.modi_image.kill();
      this.modi_label.kill();
      this.biden_image.kill();
      this.biden_label.kill();
      this.modi_image = game.add.sprite((game.width /2)-40, 150, 'modi');//.scale.setTo(1.2);
      this.modi_image.animations.add('dance_modi');
      this.modi_image.animations.play('dance_modi', 7, true);
    }
    else {
      this.biden_image.kill();
      this.biden_label.kill()
      this.modi_image.kill();
      this.modi_label.kill()
      this.biden_image = game.add.sprite((game.width /2)-40, 150, 'biden');//.scale.setTo(1.2);
      this.biden_image.animations.add('dance_biden');
      this.biden_image.animations.play('dance_biden', 30, true);
    }




}

function startGame(item, pointer) {


    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 7000, 500 , 'backgroung');

    game.world.setBounds(0, 0, 7000, 500);

    game.physics.arcade.gravity.y = 200;

    if(this.selectedCharacter == 'biden')
    {
      player = game.add.sprite(100, 350, 'biden_avatar');
    }else
    {
      player = game.add.sprite(100, 350, 'modi_avatar');
    }

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(38, 200, 4, 16);
    player.body.tilePadding.set(32);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    createBats();
    createCoronaVirus();

    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    sprayButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    sanitizer = game.add.group();
    sanitizer.enableBody = true;
    for (var i = 1; i < 5; i++)
    {
        var s = sanitizer.create(i*600, 150, 'sanitizer');
        s.body.allowGravity = false;
    }

    vaccine = game.add.group();
    vaccine.enableBody = true;
    for (var i = 1; i < 5; i++)
    {
        var s = vaccine.create(i*700, 150, 'vaccine');
        s.body.allowGravity = false;
    }

    covid = game.add.group();
    covid.enableBody = true;
    for (var i = 1; i < 10; i++)
    {
        var c = covid.create(i*900, 350, 'covid');
        c.body.allowGravity = false;
    }

    spray = game.add.weapon(10, 'spray');
    spraySound = game.add.audio('spraySound');
    doSpray();
}



function update() {
  if(player)
  {
    player.body.velocity.x = 0;
    bat.x -= 1;
      if (cursors.left.isDown)
      {
          player.body.velocity.x = -150;
          spray.bulletAngleOffset = 180;
          spray.trackSprite(player, -30, 140, true);

          if (facing != 'left')
          {
              player.animations.play('left');
              facing = 'left';
          }
      }
      else if (cursors.right.isDown)
      {
          player.body.velocity.x = 150;
          spray.bulletAngleOffset = 0;
          spray.trackSprite(player, 150, 140, true);
          if (facing != 'right')
          {
              player.animations.play('right');
              facing = 'right';
          }
      }
      else
      {
          if (facing != 'idle')
          {
              player.animations.stop();

              if (facing == 'left')
              {
                  player.frame = 4;
              }
              else
              {
                  player.frame = 4;
              }

              facing = 'idle';
          }
      }
      if (sprayButton.isDown){
                spray.fire();
      }
      if (game.time.now > firingTimer){
                spitCoronaVirus();
      }
      if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer)
      {
          player.body.velocity.y = -250;
          jumpTimer = game.time.now + 750;
      }
      game.physics.arcade.overlap(sanitizer, player, sanitizerCollisionHandler, null, this);
      game.physics.arcade.overlap(vaccine, player, vaccineCollisionHandler, null, this);
      game.physics.arcade.collide(spray.bullets, covid, collisionHandler);
  }

}
function vaccineCollisionHandler(player, vaccine){
  vaccine.kill();
}
function collisionHandler (spray, covid){
    //  When a bullet hits an alien we kill them both
    spray.kill();
    covid.kill();
}
function sanitizerCollisionHandler (player, sanitizer ) {
    //  When a powerUp hits player we change bullet
    sanitizer.kill();
    //powerGain.play();

    spray = game.add.weapon(10, 'spray');
    doSpray();
}

function render() {
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(player);
  // game.debug.bodyInfo(player, 16, 24);
  // game.debug.cameraInfo(game.camera, 32, 32);

}
