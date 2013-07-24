Array.prototype.findSubarray = function(subarray) {
  var location;
  this.forEach(function(value, index, array){
    if (value[0] === subarray[0] && value[1] === subarray[1])
      location = index;
  });
  return location;
};

var Snake = function(boardsize){
  this.direction = [-1, 0];
  this.locations = [[boardsize/2, boardsize/2]];
};

Snake.prototype.turn = function(direction) {
  var curDir = this.direction;
  switch(direction){
    case "north":
      if(!(curDir[0] === 0 && curDir[1] === -1))
        this.direction = [0, 1];
    break;
    case "south":
      if(!(curDir[0] === 0 && curDir[1] === 1))
        this.direction = [0, -1];
    break;
    case "east":
      if(!(curDir[0] === -1 && curDir[1] === 0))
        this.direction = [1, 0];
    break;
    case "west":
      if(!(curDir[0] === 1 && curDir[1] === 0))
        this.direction = [-1, 0];
    break;
  }
};

Snake.prototype.nextLocation = function() {
  var curPos = this.locations[0];
  var newPos = [curPos[0] + this.direction[0], curPos[1] + this.direction[1]];
  return newPos;
};

var Board = function(size) {
  this.size = size;
  this.apple = [10, 12];
};

var Game = function() {
  this.board = new Board(20);
  this.snake = new Snake(this.board.size);
  this.score = 0;
  this.gameSession = undefined;
};

Game.prototype.appleGen = function() {
  var rand1, rand2, apple;
  do{
    rand1 = Math.floor(Math.random() * this.board.size);
    rand2 = Math.floor(Math.random() * this.board.size);
    apple = [rand1, rand2];
  }
  while(this.snake.locations.findSubarray(apple) !== undefined);
  return apple;
};

Game.prototype.collisions = function() {
  var snakeLocs = this.snake.locations;
  var head = snakeLocs[0];

  if(head[0] > this.board.size - 1 || head[1] > this.board.size - 1)
    return true;
  if(head[0] < 0 || head[1] < 0)
    return true;
  if(snakeLocs.slice(1).findSubarray(head) !== undefined)
    return true;
  return false;
};

Game.prototype.step = function() {
  var apple, newApple;
  var newSnakeLoc = this.snake.nextLocation();
  this.snake.locations.unshift(newSnakeLoc);

  apple = this.board.apple;
  if (apple[0] === newSnakeLoc[0] && apple[1] === newSnakeLoc[1]){
    this.score += 10;
    newApple = this.appleGen();
    this.board.apple = newApple;
  }
  else{
    this.snake.locations.pop();
  }
};

Game.prototype.render = function() {
  $('.game').removeClass("snake");
  $('.game').removeClass("apple");
  this.snake.locations.forEach(function(value, index, array){
    $('#\\[' + value[0] + '\\,' + value[1] + '\\]').addClass("snake");
  });
  var apple = this.board.apple;
  $('#\\[' + apple[0] + '\\,' + apple[1] + '\\]').addClass("apple");
  $('#scorer').html(this.score);
};

Game.prototype.gameover = function() {
  $('.game').fadeTo('slow', 0.5);
  $('#scorer').html(' You lose! Score: ' + this.score);
};

Game.prototype.start = function() {
  this.gameSession = this.gameLoop();

};

Game.prototype.pauseToggle = function() {
  if (this.gameSession !== undefined){
    clearInterval(this.gameSession);
    this.gameSession = undefined;
  }
  else{
    this.gameSession = this.gameLoop();
  }
};

Game.prototype.gameLoop = function() {
  var that = this;

  STEP_TIME_MILLIS = 100;

  var thisGame = window.setInterval(function(){
    that.step();
    if(that.collisions() === true){
      that.gameover();
      clearInterval(thisGame);
      return;
    }
    that.render();

  }, STEP_TIME_MILLIS);
  return thisGame;
};