
var game = new Phaser.Game(1320, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('backgroung', '../assets/Game_background.png');
    game.load.image('covid', '../assets/covid.png');
    game.load.image('sanitizer','../assets/sanitizer.png');
    game.load.spritesheet('player', '../assets/bigger-modi.png', 38, 56);
    game.load.tilemap('map', '../assets/tiles.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', '../assets/ground_1x1.png');
    game.load.image('spray', '../assets/spray_1.png');
}
var map;
var layer;
var cursors;
var jumpButton;
var jumpTimer = 0;
var facing='';
var sanitizer;
var covid;
var spray;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 7000, 500 , 'backgroung');

    game.world.setBounds(0, 0, 7000, 500);

    game.physics.arcade.gravity.y = 200;

    map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');

    layer = map.createLayer('Tile Layer 1');

    //layer.resizeWorld();

    map.setCollisionBetween(1, 12);

    player = game.add.sprite(100, 350, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.5;
    player.body.collideWorldBounds = true;
    player.body.setSize(38, 56, 4, 16);
    player.body.tilePadding.set(32);

    player.animations.add('left', [0, 1, 2, 3, 4], 10, true);
    player.animations.add('turn', [5], 20, true);
    player.animations.add('right', [6, 7, 8, 9, 10], 10, true);



    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Add Senitizer Randomly
    sanitizer = game.add.group();
    sanitizer.enableBody = true;
    map.createFromObjects('Object Layer 1', 34, 'sanitizer', 0, true, false, sanitizer);

    covid = game.add.group();
    covid.enableBody = true;
    map.createFromObjects('Object Layer 1', 35, 'covid', 0, true, false, covid);

    spray = game.add.weapon(1, 'spray');
    doSpray();
}



function update() {

  player.body.velocity.x = 0;
  game.physics.arcade.collide(player, layer);
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

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
    if (jumpButton.isDown){
              spray.fire();
          }

    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        //player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }
    game.physics.arcade.overlap(sanitizer, player, sanitizerCollisionHandler, null, this);
    game.physics.arcade.collide(spray.bullets, covid, collisionHandler);

}
function collisionHandler (spray, covid){
    //  When a bullet hits an alien we kill them both
    spray.kill();
    covid.kill();
}
function sanitizerCollisionHandler (player, sanitizer) {
    //  When a powerUp hits player we change bullet
    sanitizer.kill();
    //powerGain.play();

    spray = game.add.weapon(1, 'spray');
    doSpray();
}

function render() {
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(player);
  // game.debug.bodyInfo(player, 16, 24);
  //  game.debug.cameraInfo(game.camera, 32, 32);

}
