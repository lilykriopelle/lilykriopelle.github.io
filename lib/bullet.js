(function() {
  var BULLET_SPEED = 7;
  var MIN_SPEED = 2;

  var DEFAULTS = {
    radius: 1,
    color: "blue"
  };

  var Bullet = window.Asteroids.Bullet = function(game) {
    DEFAULTS.vel = [
        game.ship.velocity[0] * BULLET_SPEED,
        game.ship.velocity[1] * BULLET_SPEED
      ];

    DEFAULTS.pos = [game.ship.pos[0], game.ship.pos[1]];
    DEFAULTS.game = game;
    window.Asteroids.MovingObject.call(this, DEFAULTS);
  };

  Bullet.normalize = function(vector) {
    var dX = vector[0], dY = vector[1];
    var magnitude = Math.sqrt( (dX * dX) + (dY * dY) );
    return [vector[0]/magnitude, vector[1]/magnitude];
  };

  window.Asteroids.Util.inherits(Bullet, window.Asteroids.MovingObject);
})();
