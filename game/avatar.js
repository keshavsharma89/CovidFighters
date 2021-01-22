var selectedCharacter;
var start_game;



var game = new Phaser.Game(1320, 600, Phaser.AUTO, 'phaser-example',
 { preload: preload, create: create, update: update });

function preload(){
    game.load.atlasJSONHash('biden', '../assets/biden_spritesheet.png', '../assets/biden_spritesheet.json');
    game.load.atlasJSONHash('modi', '../assets/modi_spritesheet.png', '../assets/modi_spritesheet.json');
    game.load.image("avatar_bg", "../assets/avatar.jpeg");
    game.load.spritesheet("avatar_select", "../assets/avatar_select.png");
    game.load.spritesheet("start_game", "../assets/start_game.png");
}

function create(){
  game.add.tileSprite(0, 0, 1320, 600 , 'avatar_bg');
  let select_avatar = game.add.sprite((game.width /2)-200, 50, 'avatar_select');
  let biden_image = game.add.sprite((game.width /2)-150, 200, 'biden');
  let modi_image = game.add.sprite((game.width /2)+150, 200, 'modi');
  biden_image.animations.add('dance_biden');
  modi_image.animations.add('dance_modi');
  biden_image.inputEnabled = true;
  modi_image.inputEnabled = true;

  biden_image.animations.play('dance_biden', 10, true);
  modi_image.animations.play('dance_modi', 10, true);
  biden_image.events.onInputDown.add(selectCharacter);
  modi_image.events.onInputDown.add(selectCharacter);

}

function selectCharacter(item, pointer)
{
    this.selectedCharacter = item.key;
    if(start_game)
    {
      start.kill();
    }
    start_game = game.add.sprite((game.width /2)+40, game.height-100, 'start_game');
    start_game.anchor.set(0.5);

}


function update(){

  if (this.start_game && game.input.activePointer.isDown)
    {
        this.start_game.alpha = 0.5;
    }
    else if(this.start_game)
    {
        this.start_game.alpha = 1;
    }

}
