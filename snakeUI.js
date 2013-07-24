$(function () {
  // `canvas.get(0)` unwraps the jQuery'd DOM element;
  var game = new Game();

  $('body').append("<div id='title'>");
  $('#title').html("SNAKE");

  //initial render
  $('body').append("<div id='container'>");
  $('#container').css("width", (game.board.size) * 22);
  $('#container').css("height", (game.board.size) * 22);
  for (var i = 0; i < game.board.size; i++) {
    for(var j = 0; j < game.board.size; j++){
      $('#container').append('<div id=[' + i +',' + j +'] class="game"></div>');
    }
  }
  $('body').append("<div id='scorer'>");

  game.start();

  $('html').keydown(function (event) {
  switch(event.keyCode){
    case 38:
      game.snake.turn("west");
      break;
    case 37:
      game.snake.turn("south");
      break;
    case 40:
      game.snake.turn("east");
      break;
    case 39:
      game.snake.turn("north");
      break;
    case 32:
      game.pauseToggle();
      break;
  };
    console.log("You pressed keycode: " + event.keyCode);
  });
});