;(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.paused = false;
    this.stepInt = window.setInterval(this.game.step.bind(this.game), 20);
    window.setInterval(function(){
      this.game.draw(this.ctx);
    }.bind(this), 20);

    key('p', function() { this.togglePause(); }.bind(this));
    key('up', function() { this.game.ship.power([0,-1]); }.bind(this));
    key('left', function() { this.game.ship.power([-1,0]); }.bind(this));
    key('down', function() { this.game.ship.power([0,1]);  }.bind(this));
    key('right', function() { this.game.ship.power([1,0]);  }.bind(this));
    key('space', function() { this.game.ship.fireBullet(); }.bind(this));
    key('enter', function() { this.game.reset(); }.bind(this));
  };

  GameView.prototype.togglePause = function() {
    this.paused = !this.paused;
    if (this.paused) {
      window.clearInterval(this.stepInt);
    } else {
      this.stepInt = window.setInterval(this.game.step.bind(this.game), 20);
      window.setInterval(function(){
        this.game.draw(this.ctx);
      }.bind(this), 20);
    }
  };

})();
