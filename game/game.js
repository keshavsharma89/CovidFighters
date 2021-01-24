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
    game.load.audio('fall_die_Sound', '../assets/SoundEffects/fallAndDie.wav');
    game.load.audio('won_music', '../assets/SoundEffects/won_music.wav');
    game.load.audio('selectCharacter_background_music', '../assets/audio/selectChar.mp3');
    game.load.audio('selected_music', '../assets/SoundEffects/selected.wav');
    game.load.audio('vaccine_sound', '../assets/SoundEffects/vaccine.wav');
    game.load.audio('sanitizer_sound', '../assets/SoundEffects/sanitizer.wav');
    game.load.audio('covid_kil_sound', '../assets/SoundEffects/covidKil.wav');
    game.load.audio('crona_hit', '../assets/SoundEffects/cronaHit.wav');
    game.load.audio('gameBG', '../assets/audio/gameBG.mp3');
    game.load.image('vaccine', '../assets/vaccine.png');
    game.load.image('coronavirus', '../assets/coronavirus.png');
    game.load.atlasJSONHash('biden_win', '../assets/biden_win.png', '../assets/biden_win.json');
    game.load.atlasJSONHash('modi_win', '../assets/modi_win.png', '../assets/modi_win.json');
    game.load.atlasJSONHash('defeat', '../assets/defeat.png', '../assets/defeat.json');





}
var winner_image;
var defeat;
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
var selectCharacter_background_music;
var selected_music;
var fall_die_Sound;
var won_music;
var vaccine_sound;
var sanitizer_sound;
var covid_kil_sound;
var crona_hit;
var gameBG;
var select_avatar;
var spraySound;
var selectPlayerBackground;
var health_label;
var borderSprite ;
var bgSprite;
var barSprite ;
var health_status;
var is_player_killed= true;
var is_player_won= true;
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
  //startGame();
  biden_image.events.onInputDown.add(selectCharacter);
  game.physics.arcade.enable(biden_image);

  modi_image.events.onInputDown.add(selectCharacter);
  game.physics.arcade.enable(modi_image);

  selectCharacter_background_music = game.add.audio('selectCharacter_background_music');
  selectCharacter_background_music.play();



}


function selectCharacter(item, pointer)
{
    selected_music = game.add.audio('selected_music');
    selected_music.play();

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

    selected_music = game.add.audio('selected_music');
    selected_music.play();

    game.time.events.add(Phaser.Timer.SECOND * 1, startGameBG, this);



    if(this.selectPlayerBackground){
      this.selectPlayerBackground.kill();
    }
    selectCharacter_background_music.stop();





    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 7000, 500 , 'backgroung');

    game.world.setBounds(0, 0, 7000, 500);

    game.physics.arcade.gravity.y = 200;

    if(this.selectedCharacter == 'biden'){
      player = game.add.sprite(100, 350, 'biden_avatar');
      winner_image = game.add.sprite(6500, 150, 'biden_win');
      winner_image.animations.add('win');
      winner_image.animations.play('win', 10, true);
    }else{
      player = game.add.sprite(100, 350, 'modi_avatar');
      winner_image = game.add.sprite(6500, 150, 'modi_win');
      winner_image.animations.add('win');
      winner_image.animations.play('win', 10, true);
    }
    winner_image.visible = false;
    defeat = game.add.sprite(1000, 150, 'defeat');
    defeat.animations.add('lose');
    defeat.animations.play('lose', 10, true);
    defeat.visible = false;
    covid = game.add.group();
    covid.enableBody = true;
    for (var i = 1; i < 9; i++)
    {
        var c = covid.create(i*900, 420, 'covid');
        c.body.setCircle(40);
        c.body.allowGravity = false;
        game.add.tween(c).to({ x: c.x + 100 }, 1000, Phaser.Easing.Linear.In, true, 0, 500, true);
    }
    createBats();
    createCoronaVirus();
    game.physics.enable([player,covid, coronaGroup], Phaser.Physics.ARCADE);

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

function startGameBG() {
  gameBG = game.add.audio('gameBG');
  gameBG.play();
}

function createSanitizers(){
  sanitizer = game.add.group();
  sanitizer.enableBody = true;
  for (var i = 1; i < 5; i++)
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
    if(player.x>6300){

      player.body.allowGravity = false;
      player.body.collideWorldBounds = false;
      player.body.velocity.x = 350;
      player.animations.play('right');
      player.x += 5;
    }
    if(player.x>7000){
      player.kill();
      winner_image.visible = true;

      if(is_player_won){
        won_music = game.add.audio('won_music');
        won_music.play();
        is_player_won= false;
      }
    }
    if(currentHealth == 0 ){
      // gameBG.stop();
      defeat.x = player.x;
      defeat.visible = true;
      player.body.collideWorldBounds = false;

      if(is_player_killed){
        fall_die_Sound = game.add.audio('fall_die_Sound');
        fall_die_Sound.play();
        is_player_killed= false;
      }
      player.kill();
    }
    player.body.velocity.x = 0;
    bat.x -= 1;
      if (cursors.left.isDown)
      {
          player.body.velocity.x = -200;
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
          player.body.velocity.x = 200;
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
          player.body.velocity.y = -250;
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
  vaccine_sound = game.add.audio('vaccine_sound');
  vaccine_sound.play();


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
    covid_kil_sound = game.add.audio('covid_kil_sound');
    covid_kil_sound.play();
}

function playerCoronaCollisionHandler(player, covid){
  if(!immune){
    crona_hit = game.add.audio('crona_hit');
    crona_hit.play();
    currentHealth = currentHealth - 200;
    if(currentHealth < 0) currentHealth = 0;
    setPercent(currentHealth);

    if(currentHealth < 250) {
         setBarColor('#fc9802');
    }
  }else{
    covid_kil_sound = game.add.audio('covid_kil_sound');
    covid_kil_sound.play();
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
    sanitizer_sound = game.add.audio('sanitizer_sound');
    sanitizer_sound.play();


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
