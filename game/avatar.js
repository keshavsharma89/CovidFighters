var game;
var speedMult = 0.7;
var friction = 0.99;
var startGame;
var counter  =0;
var selectedCharacter;
var start_game;
//var colors = ["0xac81bd","0xff5050"];


 var game = new Phaser.Game(800, 700, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });





function preload(){
  console.log('----------- preload ------------');
  console.log(game);
       game.load.spritesheet('biden', '../assets/biden_gif.gif', { frameWidth: 38, frameHeight: 56 });
       game.load.spritesheet("modi", "../assets/modi_gif.gif",{ frameWidth: 38, frameHeight: 56 });
     game.load.image("avatar_bg", "../assets/avatar.jpeg");
     game.load.spritesheet("avatar_select", "../assets/avatar_select.png");
     game.load.spritesheet("start_game", "../assets/start_game.png");
}

function create(){

  game.add.tileSprite(0, 0, 800, 700 , 'avatar_bg');
    //game.stage.backgroundColor = "#000044";

    console.log(this);
    var select_avatar = game.add.sprite(150, 50, 'avatar_select');
    var biden_image = game.add.sprite(150, 200, 'biden');
    var modi_image = game.add.sprite(400, 200, 'modi');
  // biden_image.rotation = 0.14;
   //modi_image.rotation = 0.14;
   biden_image.inputEnabled = true;
   modi_image.inputEnabled = true;

//   text = game.add.text(game.width /2,game.height -100,'', {font: "18px Arial", fill: "#ffffff"})
   biden_image.events.onInputDown.add(selectCharacter);
   modi_image.events.onInputDown.add(selectCharacter);

}

function selectCharacter(item, pointer)
{
    console.log(item.key);
    this.selectedCharacter = item.key;
    if(start_game)
    {
      start.kill();
    }
     start_game = game.add.sprite(250, game.height-200, 'start_game');
  //  this.add.sprite(150, 150, 'start_game');
  //  text.text = "Start game with Covid Fight " + this.selectedCharacter ;
}


function update(){
    // var zoomed = false;
    // for(var i = 0; i < this.scrollingMap.children.length; i++){
    //      if(Math.abs(this.scrollingMap.children[i].world.x - game.width / 2) < 46 && !zoomed){
    //           this.scrollingMap.getChildAt(i).scale.setTo(1.3);
    //           zoomed = true;
    //      }
    //      else{
    //           this.scrollingMap.getChildAt(i).scale.setTo(1);
    //      }
    // }
    // if(this.scrollingMap.isBeingDragged){
    //      this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    // }
    // else{
    //      if(this.scrollingMap.movingSpeed > 1){
    //           this.scrollingMap.x += this.scrollingMap.movingSpeed * Math.cos(this.scrollingMap.movingangle);
    //           if(this.scrollingMap.x < game.width - this.scrollingMap.width){
    //                this.scrollingMap.x = game.width - this.scrollingMap.width;
    //                this.scrollingMap.movingSpeed *= 0.5;
    //                this.scrollingMap.movingangle += Math.PI;

    //           }
    //           if(this.scrollingMap.x > 0){
    //                this.scrollingMap.x = 0;
    //                this.scrollingMap.movingSpeed *= 0.5;
    //                this.scrollingMap.movingangle += Math.PI;
    //           }
    //           this.scrollingMap.movingSpeed *= friction;
    //           this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    //      }
    //      else{
    //           var distance = this.scrollingMap.savedPosition.distance(this.scrollingMap.position);
    //           var angle = this.scrollingMap.savedPosition.angle(this.scrollingMap.position);
    //           if(distance > 4){
    //                this.scrollingMap.movingSpeed = distance * speedMult;
    //                this.scrollingMap.movingangle = angle;
    //           }
    //      }
    // }
}

function render()
{

}
