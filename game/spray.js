function doSpray() {


spray.bulletAngleOffset = 0;

spray.bulletAngleVariance = 0;
spray.bulletDistance = 1000;

//spray.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
spray.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
//  The speed at which the bullet is fired
spray.bulletSpeed = 1000;

//spray.bulletRotateToVelocity = true;

//spray.fireAngle = -180;

//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
spray.fireRate = 20;

spray.onFire.add(function(){
  spraySound.play();
});

//  Tell the Weapon to track the 'player' Sprite
//  With no offsets from the position
//  But the 'true' argument tells the weapon to track sprite rotation
spray.trackSprite(player, 150, 140, true);

}
