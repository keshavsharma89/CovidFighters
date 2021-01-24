function createBats(){
  bat = game.add.sprite(6000, 20, 'bat');
  bat.visible = false;
  bat.animations.add('fly');
  bat.animations.play('fly', 10, true);
}

function createCoronaVirus(){
  coronaGroup = game.add.group();
  coronaGroup.enableBody = true;
  coronaGroup.physicsBodyType = Phaser.Physics.ARCADE;
  coronaGroup.createMultiple(30, 'coronavirus');
  coronaGroup.setAll('outOfBoundsKill', true);
  coronaGroup.setAll('checkWorldBounds', true);
}
function spitCoronaVirus () {
  coronavirus = coronaGroup.getFirstExists(false);
  if(coronavirus){
      coronavirus.reset(bat.x - 30, bat.y + 100);
      game.physics.arcade.moveToObject(coronavirus, player, 200);
  }
  firingTimer = game.time.now + 1000;
}
