(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  if (typeof Asteroids.Util === "undefined"){
    window.Asteroids.Util = {};
  }

  window.Asteroids.Util.inherits = function(ChildClass, ParentClass){
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  window.Asteroids.Util.normalize = function(vector) {
    var dX = vector[0], dY = vector[1];
    var magnitude = Math.sqrt( (dX * dX) + (dY * dY) );
    return [vector[0]/magnitude, vector[1]/magnitude];
  };

  window.Asteroids.Util.scale = function(vector, scalar) {
    return [vector[0] * scalar, vector[1] * scalar];
  };

})();
