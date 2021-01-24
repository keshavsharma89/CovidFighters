
var bgmusic;
var player_died_timer = 0;
var win_flag;
var joeBidenText;
var biden_loading_image;
var narendraModiText
var modi_loading_image;
var covidFightersText;
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
var restartText;
var shieldBarSprite;
var shieldTween ;
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

var game = new Phaser.Game(1340, 550, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //game loading stuff
    game.load.audio('loading_audio', '../assets/audio/entry_music.mp3');
    game.load.atlasJSONHash('covidFightersText', '../assets/CovidFightersTxt.png', '../assets/CovidFightersTxt.json');
    game.load.atlasJSONHash('narendraModiText', '../assets/NarendraModiText.png', '../assets/NarendraModiText.json');
    game.load.atlasJSONHash('joeBidenText', '../assets/JoeBidenText.png', '../assets/JoeBidenText.json');
    game.load.atlasJSONHash('modiEntry', '../assets/modiEntry.png', '../assets/modiEntry.json');
    game.load.atlasJSONHash('bidenEntry', '../assets/bidenEntry.png', '../assets/bidenEntry.json');

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
    game.load.audio('fall_die_Sound', '../assets/SoundEffects/fallAndDie.mp3');
    game.load.audio('won_music', '../assets/SoundEffects/won_music.wav');
    game.load.audio('selectCharacter_background_music', '../assets/audio/selectChar.mp3');
    game.load.audio('selected_music', '../assets/SoundEffects/selected.wav');
    game.load.audio('vaccine_sound', '../assets/SoundEffects/vaccine.wav');
    game.load.audio('sanitizer_sound', '../assets/SoundEffects/sanitizer.wav');
    game.load.audio('covid_kil_sound', '../assets/SoundEffects/covidKil.wav');
    game.load.audio('crona_hit', '../assets/SoundEffects/FastPunch.mp3');
    game.load.audio('gameBG', '../assets/audio/gameBG.mp3');
    game.load.image('vaccine', '../assets/vaccine.png');
    game.load.image('coronavirus', '../assets/coronavirus.png');
    game.load.image('restart_text', '../assets/restart_text.png');
    game.load.atlasJSONHash('biden_win', '../assets/biden_win.png', '../assets/biden_win.json');
    game.load.atlasJSONHash('modi_win', '../assets/modi_win.png', '../assets/modi_win.json');
    game.load.atlasJSONHash('defeat', '../assets/defeat.png', '../assets/defeat.json');
    game.load.image('win_flag', '../assets/win_flag.png');
}

function create(){
 game.input.onDown.addOnce(startBgmusic, this);
  //startCharacterSelection();
}
function startBgmusic(){
  bgmusic = game.add.audio('loading_audio');
  bgmusic.play();
  game.time.events.add(Phaser.Timer.SECOND * 4, startBiden, this);
}
function startBiden(){
  joeBidenText = game.add.sprite( 400, 200, 'joeBidenText');
  joeBidenText.animations.add('joe_Biden_Text');
  joeBidenText.animations.play('joe_Biden_Text', 10, true);

  game.time.events.add(Phaser.Timer.SECOND * 2, startBidenEntry, this);
}

function startBidenEntry(){
  joeBidenText.kill();
  biden_loading_image = game.add.sprite( 150, 10, 'bidenEntry');
  biden_loading_image.animations.add('load_biden');
  biden_loading_image.scale.setTo(1.7);
  biden_loading_image.animations.play('load_biden', 10, false);

  game.time.events.add(Phaser.Timer.SECOND * 5, startModi, this);
}

function startModi(){
  biden_loading_image.kill();

  narendraModiText = game.add.sprite( 250, 220, 'narendraModiText');
  narendraModiText.animations.add('narendra_ModiText');
  narendraModiText.animations.play('narendra_ModiText', 10, true);
  game.time.events.add(Phaser.Timer.SECOND * 2, startModiEntry, this);
}

function startModiEntry(){
  narendraModiText.kill();
  modi_loading_image = game.add.sprite( 200, 10, 'modiEntry');
  modi_loading_image.animations.add('load_modi');
  modi_loading_image.scale.setTo(1.7);
  modi_loading_image.animations.play('load_modi', 7, false);
  game.time.events.add(Phaser.Timer.SECOND * 7, showTitle, this);
}

function showTitle(){
  modi_loading_image.kill();
  covidFightersText = game.add.sprite(90, 220, 'covidFightersText');
  covidFightersText.animations.add('covid_Fighters_Text');
  covidFightersText.scale.setTo(1.3);
  covidFightersText.animations.play('covid_Fighters_Text', 10, true);
  game.time.events.add(Phaser.Timer.SECOND * 8.75, oneSecPause, this);
}

function oneSecPause(){
  bgmusic.stop();
  game.time.events.add(Phaser.Timer.SECOND * 1, startCharacterSelection, this);
}
function startCharacterSelection(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  if(bgmusic)
    bgmusic.stop();

  if(covidFightersText)
    covidFightersText.kill();
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

function restartGame()
{
  if(defeat)
    defeat.kill();
  restartText.kill();
  if(selected_music)
    selected_music.stop();

  if(player)
    player.kill();

  if(sanitizer)
    sanitizer.kill();

  if(vaccine)
    vaccine.kill();

  if(bat)
    bat.kill();

  if(coronaGroup)
    coronaGroup.kill();

  if(covid)
    covid.kill();

  if(selectPlayerBackground){
    selectPlayerBackground.kill();
  }
  this.game.state.restart();
  currentHealth = 500;
  facing = 'idle';
  startCharacterSelection();
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
  immune = true;
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

  shieldBarSprite = this.game.add.sprite(defaultConfig.x, defaultConfig.y+80, bmdw);
  shieldBarSprite.fixedToCamera= true;


  shieldTween  = this.game.add.tween(shieldBarSprite).to( { width: 0 }, 6000, Phaser.Easing.Linear.None, true);
  shieldTween.onComplete.add(function(){
    shieldBarSprite.kill();
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




    if(selectPlayerBackground){
      selectPlayerBackground.kill();

    }
    selectCharacter_background_music.stop();





    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 7000, 500 , 'backgroung');

    game.world.setBounds(0, 0, 7000, 500);

    game.physics.arcade.gravity.y = 200;

    if(this.selectedCharacter == 'biden'){
      player = game.add.sprite(100, 350, 'biden_avatar');
      winner_image = game.add.sprite(400, 100, 'biden_win');
      winner_image.animations.add('win');
      winner_image.animations.play('win', 10, true);
    }else{
      player = game.add.sprite(100, 350, 'modi_avatar');
      winner_image = game.add.sprite(400, 100, 'modi_win');
      winner_image.animations.add('win');
      winner_image.animations.play('win', 10, true);
    }
    winner_image.visible = false;
    winner_image.fixedToCamera = true;

    defeat = game.add.sprite(400, 100, 'defeat');
    defeat.animations.add('lose');
    defeat.animations.play('lose', 10, true);
    defeat.visible = false;

    defeat.fixedToCamera = true;
    defeat.inputEnabled = true;
    defeat.events.onInputDown.add(restartGame);

    restartText = game.add.sprite(350, 430, 'restart_text');
    restartText.visible = false;
    restartText.fixedToCamera = true;
    restartText.inputEnabled = true;
    restartText.events.onInputDown.add(restartGame);


    win_flag = game.add.sprite(6300, 250, 'win_flag');

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

    if(player && player.body)
  {player.body.collideWorldBounds = true;
    player.body.setSize(127, 155, 4, 5);
}
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
  for (var i = 1; i < 7; i++)
  {
      var s = vaccine.create(i*900, 150, 'vaccine');
      s.body.allowGravity = false;
  }
}

function update() {
  if(player)
  {
    if(player.x>6300){
      if(player.body)
      {player.body.allowGravity = false;
      player.body.collideWorldBounds = false;
      player.body.velocity.x = 350;
      }
      player.animations.play('right');
      player.x += 5;

    }
    if(player.x>7000){
      player.kill();
      winner_image.visible = true;
      win_flag.kill();

      if(is_player_won){
        won_music = game.add.audio('won_music');
        won_music.play();
        is_player_won= false;
      }
    }
    if(currentHealth == 0 ){

      if(player.body)
        player.body.collideWorldBounds = false;

      sanitizer.kill();
      vaccine.kill();
      bat.kill();
      coronaGroup.kill();
      covid.kill();

  //    game.add.tween(defeat.scale).to( { x: 1.2, y: 1.2 }, 1000, Phaser.Easing.Elastic.Out, true);

      if(is_player_killed){
        fall_die_Sound = game.add.audio('fall_die_Sound');
        fall_die_Sound.play();
        is_player_killed= false;
        player_died_timer = game.time.now + 1000;
      }
    }
    if(currentHealth == 0 && game.time.now > player_died_timer){
      player.kill();
      defeat.visible = true;
      restartText.visible = true;
      defeat.scale.set(1.2);
      //if(defeat.visible)


      //if(restartText.visible)
        restartText.events.onInputDown.add(startCharacterSelection);

  }
    if(player.body)
      player.body.velocity.x = 0;
    bat.x -= 1;
      if (cursors.left.isDown)
      {
          if(player.body)
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
          if(player.body)
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
      if (cursors.up.isDown && player.body && player.body.onFloor() && game.time.now > jumpTimer)
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
    currentHealth = currentHealth - 50;
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
