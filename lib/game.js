;(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function(){
    this.asteroids = [];
    this.bullets = [];
    this.cur_wave_asteroids = 1;
    this.current_score = 0;
    this.asteroidsWave = function() {
      for(var i = 0; i < this.cur_wave_asteroids; i++){
        var pos = this.randomPosition();
        this.asteroids.push(new window.Asteroids.Asteroid(pos, this));
      }
    };
    this.asteroidsWave();
    this.ship = new window.Asteroids.Ship(this.randomPosition(), this);
  };

 Game.prototype.levelUp = function() {
   this.cur_wave_asteroids = 1 + this.cur_wave_asteroids;
   this.asteroidsWave();
   if (this.ship.lives < 5) {
     this.ship.lives += 1;
   }
 };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.MAX_LIVES = 5;
  Game.DRAG = 0.99;

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 1200, 800);
    ctx.rect(0, 0, 1200, 800);
    ctx.fill();
    this.renderLives(ctx);
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.renderLives = function(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.rect(Game.DIM_X - 300, 25, 270, 50);
    ctx.stroke();

    for (var j = 0; j < this.ship.lives; j++) {
      var lifePos = [(Game.DIM_X - 50 * j) - 50, 50];
      ctx.beginPath();
      ctx.moveTo(lifePos[0], lifePos[1]);
      ctx.lineTo(lifePos[0] - 30, lifePos[1] - 10);
      ctx.lineTo(lifePos[0] - 30, lifePos[1] + 10);
      ctx.lineTo(lifePos[0], lifePos[1]);
      ctx.fill();
      ctx.stroke();
    }
  };

  Game.prototype.randomPosition = function() {
    return [
     Math.random() * (Game.DIM_X - 50),
     Math.random() * (Game.DIM_Y - 50)
   ];
 };

  Game.prototype.moveObjects = function(){
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move();
    }
  };

  Game.prototype.checkCollisions = function() {
    var collidedPairs = [];

    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = 0; j < this.allObjects().length; j++) {
        if (i !== j &&  this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          collidedPairs.push([this.allObjects()[j], this.allObjects()[i]]);
        }
      }
    }

    for (var k = 0; k < collidedPairs.length; ++k){
      collidedPairs[k][0].collideWith(collidedPairs[k][1]);
    }
  };

  Game.prototype.remove = function (obj) {
    var index;
    if (obj instanceof window.Asteroids.Asteroid) {
      index = this.asteroids.indexOf(obj);
      if (index > -1){
        this.asteroids.splice(index, 1);
      }
    } else if (obj instanceof window.Asteroids.Bullet) {
      index = this.bullets.indexOf(obj);
      if (index > -1){
        this.bullets.splice(index, 1);
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    if (this.ship.lives <= 0) {
      alert("Game over.  Click 'OK' or hit enter to play again.");
      this.reset();
    }
  };

  Game.prototype.reset = function() {
    this.current_score = 0;
    $(".score-report").html("Current score: " + this.current_score);
    this.asteroids = [];
    this.bullets = [];
    this.cur_wave_asteroids = 1;
    this.asteroidsWave();
    this.ship = new window.Asteroids.Ship(this.randomPosition(), this);
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship, this.bullets);
  };

  Game.outOfBounds = function(obj) {
    return !(obj.pos[0] < this.DIM_X && obj.pos[0] > 0 && obj.pos[1] < this.DIM_Y && obj.pos[1] > 0);
  };

  Game.inBounds = function(point) {
    return (point[0] < this.DIM_X && point[0] > 0 && point[1] < this.DIM_Y && point[1] > 0);
  };

  Game.wrap = function (pos, obj) {
    var wrappedPos = pos;
    if (pos[0] - obj.radius > Game.DIM_X) {
      wrappedPos[0] = 0 - obj.radius;
    }
    if (pos[1] - obj.radius > Game.DIM_Y) {
      wrappedPos[1] = 0 - obj.radius;
    }
    if (pos[0] + obj.radius < 0) {
      wrappedPos[0] = Game.DIM_X + obj.radius;
    }
    if (pos[1] + obj.radius < 0) {
      wrappedPos[1] = Game.DIM_Y + obj.radius;
    }

    return wrappedPos;
  };

})();
