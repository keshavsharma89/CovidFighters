
var game = new Phaser.Game(1320, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('backgroung', '../assets/Game_background.png');
    //game.load.image('player','assets/sprites/phaser-dude.png');
    // game.load.spritesheet('player', '../assets/bigger-modi.png', 38, 56);
    game.load.spritesheet('player', '../assets/Bbiden1.png', 140, 323);
}

var cursors;
var jumpButton;
var jumpTimer = 0;
var facing='';

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 7000, 500 , 'backgroung');

    game.world.setBounds(0, 0, 7000, 500);

    game.physics.arcade.gravity.y = 100;
    player = game.add.sprite(40, 100, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(10, 210, 5, 22);

    player.animations.add('left', [0, 1, 2, 3, 4], 10, true);
    player.animations.add('turn', [5], 20, true);
    player.animations.add('right', [6, 7, 8, 9, 10], 10, true);

    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {

  player.body.velocity.x = 0;

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

    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -150;
        jumpTimer = game.time.now + 750;
    }

}

function render() {
  // game.debug.text(game.time.physicsElapsed, 32, 32);
  // game.debug.body(player);
  // game.debug.bodyInfo(player, 16, 24);
  //  game.debug.cameraInfo(game.camera, 32, 32);

}
