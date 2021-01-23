
var game = new Phaser.Game(1320, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
  game.load.audio('loading_audio', '../assets/audio/entry_music.mp3');



  game.load.atlasJSONHash('covidFightersText', '../assets/CovidFightersTxt.png', '../assets/CovidFightersTxt.json');
  game.load.atlasJSONHash('narendraModiText', '../assets/NarendraModiText.png', '../assets/NarendraModiText.json');
  game.load.atlasJSONHash('joeBidenText', '../assets/JoeBidenText.png', '../assets/JoeBidenText.json');
  game.load.atlasJSONHash('modiEntry', '../assets/modiEntry.png', '../assets/modiEntry.json');
  game.load.atlasJSONHash('biden', '../assets/bidenEntry.png', '../assets/bidenEntry.json');

}

var bgmusic, joeBidenText, biden_image, narendraModiText, modi_image, covidFightersText;

function create() {
  game.input.onDown.addOnce(startBgmusic, this);
}

function update() {}

// other helper functions
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
  biden_image = game.add.sprite( 150, 10, 'biden');
  biden_image.animations.add('dance_biden');
  biden_image.scale.setTo(1.7);
  biden_image.animations.play('dance_biden', 10, false);

  game.time.events.add(Phaser.Timer.SECOND * 5, startModi, this);
}

function startModi(){
  biden_image.kill();

  narendraModiText = game.add.sprite( 250, 220, 'narendraModiText');
  narendraModiText.animations.add('narendra_ModiText');
  narendraModiText.animations.play('narendra_ModiText', 10, true);
  game.time.events.add(Phaser.Timer.SECOND * 2, startModiEntry, this);
}

function startModiEntry(){
  narendraModiText.kill();
  modi_image = game.add.sprite( 200, 10, 'modiEntry');
  modi_image.animations.add('dance_modi');
  modi_image.scale.setTo(1.7);
  modi_image.animations.play('dance_modi', 7, false);
  game.time.events.add(Phaser.Timer.SECOND * 7, showTitle, this);
}

function showTitle(){
  modi_image.kill();
  covidFightersText = game.add.sprite(90, 220, 'covidFightersText');
  covidFightersText.animations.add('covid_Fighters_Text');
  covidFightersText.scale.setTo(1.3);
  covidFightersText.animations.play('covid_Fighters_Text', 10, true);
}
