function createBats(){
  bat = game.add.group();
  bat.enableBody=true;
  for (var i = 1; i <= 1; i++)
    {
        var b = bat.create(i*1000, 20, 'bat', 0);
        b.body.allowGravity=false;
    }
  bat.callAll('animations.add', 'animations', 'fly', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15, true);
  bat.callAll('play', null, 'fly');
}

function createCoronaVirus(){
  coronaGroup = game.add.group();
  coronaGroup.enableBody = true;
  coronaGroup.physicsBodyType = Phaser.Physics.ARCADE;
  if(!false){
    coronaGroup.createMultiple(30, 'coronavirus');
  }

  coronaGroup.setAll('outOfBoundsKill', true);
  coronaGroup.setAll('checkWorldBounds', true);
}
function spitCoronaVirus () {
  coronavirus = coronaGroup.getFirstExists(false);
  bat.forEachAlive(function(b){
    coronavirus.reset(b.body.x - 30, b.body.y + 100);
    game.physics.arcade.moveToObject(coronavirus, player, 200);
  });
  firingTimer = game.time.now + 1000;
}
