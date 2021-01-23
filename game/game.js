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
    game.load.spritesheet('modi_avatar', '../assets/modi1152.png', 127, 155);
    game.load.spritesheet('biden_avatar', '../assets/biden11521.png', 127, 155);
    game.load.atlasJSONHash('bat', '../assets/bat.png', '../assets/bat.json');
    game.load.image('spray', '../assets/spray.png');
    game.load.audio('spraySound', '../assets/SoundEffects/spray-sound.mp3');
    game.load.image('vaccine', '../assets/vaccine.png');
    game.load.image('coronavirus', '../assets/coronavirus.png');
    game.load.image('congratulation','../assets/congratulation.png');
}
var congratulation;
var cursors;
var player;
var sprayButton;
var jumpTimer = 0;
var facing='';
var sanitizer;
var covid;
var coronaGroup;
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
var selectPlayerBackground;
var health_label;
var borderSprite ;
var bgSprite;
var barSprite ;
var health_status;
var totalHealth = 500;
var currentHealth = 500;
var shield;
var immune = false;
var defaultConfig= {
    width: 250,
    height: 15,
    x: 40,
    y: 40,
    bg: {
        color: '#651828'
    },
    bar: {
        color: '#53fc0a'
    },
    shieldBar: {
        color: '#0ad4fc'
    },
    border: {
        color: "#eeeeee",
        width: 1
    },
    animationDuration: 200,
    flipped: false,
    isFixedToCamera: false
};

function create(){

  game.physics.startSystem(Phaser.Physics.ARCADE);
  selectPlayerBackground = game.add.tileSprite(0, 0, 1320, 600 , 'avatar_bg');
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
  startGame();
  //biden_image.events.onInputDown.add(selectCharacter);
  //modi_image.events.onInputDown.add(selectCharacter);

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

function createHealthBar()
{


	health_label = this.game.add.text(40, 10, 'Player Health', { font: '20px Arial', fill: '#53fc0a' })
  health_label.fixedToCamera= true;

  let border = defaultConfig.border.width * 2;
  let bmd = this.game.add.bitmapData(defaultConfig.width + border, defaultConfig.height + border);
  bmd.ctx.fillStyle = defaultConfig.border.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, defaultConfig.width + border, defaultConfig.height + border);
  bmd.ctx.stroke();
  bmd.update();

  borderSprite = this.game.add.sprite(defaultConfig.x, defaultConfig.y, bmd);
  borderSprite.fixedToCamera= true;

  let bmdg = this.game.add.bitmapData(defaultConfig.width, defaultConfig.height);
  bmdg.ctx.fillStyle = defaultConfig.bg.color;
  bmdg.ctx.beginPath();
  bmdg.ctx.rect(0, 0, defaultConfig.width, defaultConfig.height);
  bmdg.ctx.fill();
  bmdg.update();

  bgSprite = this.game.add.sprite(defaultConfig.x, defaultConfig.y, bmdg);
  bgSprite.fixedToCamera= true;

  let bmdw = this.game.add.bitmapData(defaultConfig.width, defaultConfig.height);
  bmdw.ctx.fillStyle = defaultConfig.bar.color;
  bmdw.ctx.beginPath();
  bmdw.ctx.rect(0,0, defaultConfig.width, defaultConfig.height);
  bmdw.ctx.fill();
  bmdw.update();

  barSprite = this.game.add.sprite(defaultConfig.x, defaultConfig.y, bmdw);
  barSprite.fixedToCamera= true;

  health_status = this.game.add.text(130, 40, currentHealth+'/'+totalHealth, { font: '12px Arial', fill: '#000000' })
  health_status.fixedToCamera= true;
}


function createProtectionBar()
{


	var shield_label = this.game.add.text(40, 80, 'Player Shield', { font: '20px Arial', fill: '#0ad4fc' })
  shield_label.fixedToCamera= true;

  let border = defaultConfig.border.width * 2;
  let bmd = this.game.add.bitmapData(defaultConfig.width + border, defaultConfig.height + border);
  bmd.ctx.fillStyle = defaultConfig.border.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, defaultConfig.width + border, defaultConfig.height + border);
  bmd.ctx.stroke();
  bmd.update();

  var shieldBorderSprite = this.game.add.sprite(defaultConfig.x, defaultConfig.y+80, bmd);
  shieldBorderSprite.fixedToCamera= true;

  let bmdg = this.game.add.bitmapData(defaultConfig.width, defaultConfig.height);
  bmdg.ctx.fillStyle = defaultConfig.bg.color;
  bmdg.ctx.beginPath();
  bmdg.ctx.rect(0, 0, defaultConfig.width, defaultConfig.height);
  bmdg.ctx.fill();
  bmdg.update();

  var shieldBgSprite = this.game.add.sprite(defaultConfig.x, defaultConfig.y+80, bmdg);
  shieldBgSprite.fixedToCamera= true;

  let bmdw = this.game.add.bitmapData(defaultConfig.width, defaultConfig.height);
  bmdw.ctx.fillStyle = defaultConfig.shieldBar.color;
  bmdw.ctx.beginPath();
  bmdw.ctx.rect(0,0, defaultConfig.width, defaultConfig.height);
  bmdw.ctx.fill();
  bmdw.update();

  var shieldBarSprite = this.game.add.sprite(defaultConfig.x, defaultConfig.y+80, bmdw);
  shieldBarSprite.fixedToCamera= true;
    immune = true;

  var shieldTween  = this.game.add.tween(shieldBarSprite).to( { width: 0 }, 5000, Phaser.Easing.Linear.None, true);
  shieldTween.onComplete.add(function(){shieldBarSprite.kill();
  shieldBgSprite.kill();
  shieldBorderSprite.kill();
  shield_label.kill();
    immune = false;
  });
}

function startGame(item, pointer) {
    if(this.selectPlayerBackground)
    {this.selectPlayerBackground.kill();}
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
    covid = game.add.group();
    covid.enableBody = true;
    for (var i = 1; i < 10; i++)
    {
        var c = covid.create(i*900, 390, 'covid');
        c.body.setCircle(45);
        c.body.allowGravity = false;
    }
    createBats();
    createCoronaVirus();
    congratulation = game.add.sprite(6500, 250, 'congratulation');
    game.physics.enable([player,covid, coronaGroup, congratulation], Phaser.Physics.ARCADE);
    congratulation.body.allowGravity = false;
    player.body.collideWorldBounds = true;
    player.body.setSize(127, 155, 4, 5);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    createHealthBar();
    createSanitizers();
    createVaccine();

    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    sprayButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spray = game.add.weapon(10, 'spray');
    spraySound = game.add.audio('spraySound');
    doSpray();
}

function createSanitizers(){
  sanitizer = game.add.group();
  sanitizer.enableBody = true;
  for (var i = 1; i < 1; i++)
  {
      var s = sanitizer.create(i*600, 150, 'sanitizer');
      s.body.allowGravity = false;
  }
}

function createVaccine(){
  vaccine = game.add.group();
  vaccine.enableBody = true;
  for (var i = 1; i < 5; i++)
  {
      var s = vaccine.create(i*900, 150, 'vaccine');
      s.body.allowGravity = false;
  }
}

function update() {
  if(player)
  {
    if(player.x>6700){

      player.body.allowGravity = false;
      player.body.collideWorldBounds = false;
      congratulation.body.velocity.y -= 10;

    }
    if(player.x>7000){
      player.kill();
    }
    player.body.velocity.x = 0;
    bat.x -= 1;
      if (cursors.left.isDown)
      {
          player.body.velocity.x = -250;
          spray.bulletAngleOffset = 180;
          spray.trackSprite(player, -30, 110, true);

          if (facing != 'left')
          {
              player.animations.play('left');
              facing = 'left';
          }
      }
      else if (cursors.right.isDown)
      {
          player.body.velocity.x = 350;
          spray.bulletAngleOffset = 0;
          spray.trackSprite(player, 150, 110, true);
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
          player.body.velocity.y = -280;
          jumpTimer = game.time.now + 750;
      }
      game.physics.arcade.overlap(sanitizer, player, sanitizerCollisionHandler, null, this);
      game.physics.arcade.overlap(vaccine, player, vaccineCollisionHandler, null, this);
      game.physics.arcade.collide(spray.bullets, covid, collisionHandler);
      game.physics.arcade.collide(player, covid, playerCoronaCollisionHandler);
      game.physics.arcade.collide(player, coronaGroup, playerCoronaCollisionHandler);
  }

}
function vaccineCollisionHandler(player, vaccine){
  vaccine.kill();
  currentHealth = currentHealth + 100;
  if(currentHealth > 500) currentHealth = 500;
  setPercent(currentHealth);

  if(currentHealth >= 250) {
       setBarColor('#53fc0a');
  }

createProtectionBar();
//  shield = game.time.events.loop(Phaser.Timer.SECOND * 1, protection, this);

//  game.time.events.add(Phaser.Timer.SECOND * 6, removeProtection, this);

}


function collisionHandler (spray, covid){
    //  When a bullet hits an alien we kill them both
    spray.kill();
    covid.kill();
}

function playerCoronaCollisionHandler(player, covid)
{
  if(!immune){
    currentHealth = currentHealth - 200;
    if(currentHealth < 0) currentHealth = 0;
    setPercent(currentHealth);

    if(currentHealth < 250) {
         setBarColor('#fc9802');
    }
  }
  if(currentHealth == 0 ){
    player.body.collideWorldBounds = false;
  }
  covid.kill();
}


function setPercent(newValue){
  if(newValue < 0) newValue = 0;
  if(newValue > 500) newValue = 500;

  let newWidth =  (newValue * defaultConfig.width) / 500;

  setWidth(newWidth);
}

function setWidth(newWidth){
  health_status.text = currentHealth+'/'+totalHealth;
  this.game.add.tween(barSprite).to( { width: newWidth }, defaultConfig.animationDuration, Phaser.Easing.Linear.None, true);
}

function setBarColor(newColor) {
  let bmd = this.barSprite.key;
  bmd.update();

  let currentRGBColor = bmd.getPixelRGB(0, 0);
  let newRGBColor = hexToRgb(newColor);
  bmd.replaceRGB(currentRGBColor.r,
                  currentRGBColor.g,
                  currentRGBColor.b,
                  255 ,

                  newRGBColor.r,
                  newRGBColor.g,
                  newRGBColor.b,
                  255);

}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function sanitizerCollisionHandler (player, sanitizer ) {
    //  When a powerUp hits player we change bullet
    sanitizer.kill();
    //powerGain.play();

    spray = game.add.weapon(10, 'spray');
    doSpray();
}


function render() {
  //game.debug.bodyInfo(player,32,32);
  // covid.forEachAlive(function(b){
  //   game.debug.body(b);
  // });
}
