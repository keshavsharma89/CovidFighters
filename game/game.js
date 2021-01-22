
var game = new Phaser.Game(1320, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('backgroung', '../assets/Game_background.png');
    game.load.image('covid', '../assets/covid.png');
    game.load.image('sanitizer','../assets/sanitizer.png');
    game.load.spritesheet('player', '../assets/modi1152.png', 127, 190);
    //game.load.spritesheet('player', '../assets/bigger-modi.png', 38, 56);
    //game.load.tilemap('map', '../assets/tiles.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.image('ground_1x1', '../assets/ground_1x1.png');
    game.load.image('spray', '../assets/spray.png');
    game.load.image('vaccine', '../assets/vaccine.png');
}
var map;
var layer;
var cursors;
var sprayButton;
var jumpTimer = 0;
var facing='';
var sanitizer;
var covid;
var spray;
var vaccine;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 7000, 500 , 'backgroung');

    game.world.setBounds(0, 0, 7000, 500);

    game.physics.arcade.gravity.y = 200;

    //map = game.add.tilemap('map');

    //map.addTilesetImage('ground_1x1');

    //layer = map.createLayer('Tile Layer 1');

    //layer.resizeWorld();

    //map.setCollisionBetween(1, 34);

    player = game.add.sprite(100, 350, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(38, 200, 4, 16);
    player.body.tilePadding.set(32);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);



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
    if (sprayButton.isDown){
              spray.fire();
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
