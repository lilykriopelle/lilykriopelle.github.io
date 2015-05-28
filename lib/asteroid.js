(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function(pos, game, radius, dir, spawned){
    var defaults = {};
    defaults.game = game;
    defaults.color = "white";
    defaults.radius = radius || (Math.random() * Asteroid.SIZE) + 20;
    defaults.pos = pos;
    this.points = window.Asteroids.Asteroid.generateGeometry(defaults.radius);
    defaults.vel = dir || (function(){
      var negX = Math.random() > 0.5 ? -1 : 1;
      var negY = Math.random() > 0.5 ? -1 : 1;
      return [Math.random() * negX * (200/defaults.radius), Math.random() * (200/defaults.radius) * negY];
    }());

    if (spawned) {
      defaults.vel = window.Asteroids.Util.scale(defaults.vel, 2);
    }

    window.Asteroids.MovingObject.call(this, defaults);
  };

  Asteroid.SIZE = 100;

  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(other) {
    if (other instanceof window.Asteroids.Ship) {
      other.relocate();
    } else if (other instanceof window.Asteroids.Bullet) {
      this.game.remove(other);
      this.game.remove(this);
      this.game.current_score += 1;
      $(".score-report").html("Current score: " + this.game.current_score);
      window.Asteroids.Asteroid.spawn(this, this.game, other);
    }

    if (this.game.asteroids.length === 0) {
      this.game.levelUp();
    }
  };

  Asteroid.generateGeometry = function(r) {
    var points = new Array();
    for (var k = 1; k <= 8; k++) {
      var a = ((45*k)/180) * Math.PI;
      var point = [(r * Math.cos(a)),
                   (r * Math.sin(a))];
      point = window.Asteroids.Util.scale(point, getRandomArbitrary(0.45, 1));
      points.push(point);
    }
    return points;
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  Asteroid.prototype.draw = function(ctx) {
    var points = this.points;
    var pX = this.pos[0], pY = this.pos[1];
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0][0] + pX, points[0][1] + pY);

    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(this.points[i][0] + pX, this.points[i][1] + pY);
    }
    ctx.lineTo(this.points[0][0] + pX, this.points[0][1] + pY);

    ctx.fill();
    ctx.stroke();
  };

  Asteroid.outOfBounds = function (points) {
    var outOfBounds = false;
    for (var i = 0; i < points.length; i++) {
      if (! window.Asteroids.Game.inBounds(points[i])) {
        return true;
      }
    }
    return false;
  };

  Asteroid.spawn = function(asteroid, game, bullet) {
    var bulletVelX = bullet.velocity[0], bulletVelY = bullet.velocity[1];
    if (asteroid.radius > 40) {
      var newRadius = asteroid.radius/2;
      game.asteroids.push(new window.Asteroids.Asteroid(
        [asteroid.pos[0] - newRadius, asteroid.pos[1] - newRadius],
        game,
        newRadius,
        [-1 + Math.random(), -1 + Math.random()],
        true)
      );

      game.asteroids.push(new window.Asteroids.Asteroid(
        [asteroid.pos[0] + newRadius, asteroid.pos[1] - newRadius],
        game,
        newRadius,
        [1 + Math.random(), -1 + Math.random()],
        true)
      );

      game.asteroids.push(new window.Asteroids.Asteroid(
        [asteroid.pos[0] - newRadius, asteroid.pos[1] + newRadius],
        game,
        newRadius,
        [-1 + Math.random(), 1 + Math.random()],
        true)
      );

      game.asteroids.push(new window.Asteroids.Asteroid(
        [asteroid.pos[0] + newRadius, asteroid.pos[1]  + newRadius],
        game,
        newRadius,
        [1 + Math.random(),1 + Math.random()],
        true)
      );
    }
  };

})();
