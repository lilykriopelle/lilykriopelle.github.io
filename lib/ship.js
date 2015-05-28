(function() {
  var DEFAULTS = {
    color: "black",
    radius: 1,
    vel: [0,0]
  };

  var MAX_SPEED = 15;

  var Ship = window.Asteroids.Ship = function(pos,game) {
    DEFAULTS.pos = pos;
    DEFAULTS.game = game;
    this.lives = window.Asteroids.Game.MAX_LIVES;
    window.Asteroids.MovingObject.call(this, DEFAULTS);
  };

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = game.randomPosition();
    this.velocity = [0,0];
    this.lives--;
  };

  Ship.prototype.power = function (impulse) {
    if (Math.abs(this.velocity[0] + impulse[0]) < MAX_SPEED) {
      this.velocity[0] += impulse[0];
    }

    if (Math.abs(this.velocity[1] + impulse[1]) < MAX_SPEED) {
      this.velocity[1] += impulse[1];
    }
  };

  Ship.prototype.fireBullet = function() {
    if (Math.abs(this.velocity[0]) > 0 || Math.abs(this.velocity[1]) > 0 ) {
      this.game.bullets.push(new window.Asteroids.Bullet(this.game));
    }
  };

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle());
    ctx.translate(-1* this.pos[0], -1*this.pos[1]);
    this.drawShip(ctx);
    ctx.restore();
  };

  Ship.prototype.drawShip = function(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] - 20, this.pos[1] - 7);
    ctx.lineTo(this.pos[0] - 20, this.pos[1] + 7);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.fill();
    ctx.stroke();
  };

})();
