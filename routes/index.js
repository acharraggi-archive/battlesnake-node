var config  = require('../config.json');
var express = require('express');
var router  = express.Router();
var fs = require('fs');

// Handle GET request to '/'
router.get(config.routes.info, function (req, res) {
  // Response data
  var data = {
    color: config.snake.color,
    head_url: config.snake.head_url,
      name: config.snake.name,
      taunt: config.snake.taunt.start
  };
    console.log(data);
  return res.json(data);
});

// Handle GET request to '/head.png'
router.get(config.routes.head, function (req, res) {
    // Response data
    var img = fs.readFileSync('./head.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
});

// Handle POST request to '/start'
router.post(config.routes.start, function (req, res) {
  // Do something here to start the game

  console.log("start request body:");
    console.log(req.body);

  // Response data
  var data = {
    color: config.snake.color,
      head_url: config.snake.head_url,
      name: config.snake.name,
    taunt: config.snake.taunt.start
  };
    console.log("start response:");
  console.log(data);
  return res.json(data);
});

// Handle POST request to '/move'
router.post(config.routes.move, function (req, res) {
  // Do something here to generate your move
    // one of: ["up", "down", "left", "right"]

    console.log("move request body:");
    console.log(req.body);

    var plissken = null;
    var me = req.body.you;
    var height = req.body.height;
    console.log("height: ".concat(height));
    var width = req.body.width;
    console.log("width: ".concat(width));

    var snakes = req.body.snakes;
    var food = req.body.food;

    console.log("number of snakes: "+snakes.length);
    console.log(snakes[0].name);
    for(var i = 0; i < snakes.length; i++) {
      if(snakes[i].id == me) {
          plissken = snakes[i];
        console.log("Found snake: ".concat(snakes[i].name));
        var c = snakes[i].coords;
        console.log("number of coords: "+c.length);
          for(var j = 0; j < c.length; j++) {
              console.log(c[j]);
          }
        break;  // stop loop once found
      }
    }

    function move1() { // move1 moves left or right at start and keeps going
        if(plissken === null) {
            // Response data, one of: ["up", "down", "left", "right"]
            return "down";
        }
        else {
            if(req.body.turn == 0) {
                if(plissken.coords[0][0] == (width-1) || (plissken.coords[0][0] != 0 && plissken.coords[0][0] < width/2)) {
                    return "left";
                }
                else {
                    return "right";
                }
            }
            else {  // keep heading same direction
                if(plissken.coords[0][0] < plissken.coords[1][0]) {    // we're heading left
                    return "left";
                }
                else {
                    return "right";
                }
            }
        }
    }


    function move2() { // move2 random 'safe' moves
        if(plissken === null) {
            // Response data, one of: ["up", "down", "left", "right"]
            return "down";
        }
        else {
            var s = 0;
            var moves = [];
            var found = false;
            var possible_moves = -1;

            console.log("head: ".concat(plissken.coords[0]));
            console.log("x: ".concat(plissken.coords[0][0]));
            console.log("y: ".concat(plissken.coords[0][1]));


            if (plissken.coords[0][0] != width - 1) { // test right
                 var right = [plissken.coords[0][0]+1,plissken.coords[0][1]];
                 console.log("right coord: ".concat(right));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == right[0] && plissken.coords[s][1] == right[1]) {
                        found = true;
                        console.log("found body");
                    }
                }
                if(!found) {
                    console.log("move right ok");
                    possible_moves++;
                    moves[possible_moves] = "right";
                }
            }

            found = false;
            if (plissken.coords[0][0] != 0) { // test left
                var left = [plissken.coords[0][0]-1,plissken.coords[0][1]];
                console.log("left coord: ".concat(left));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == left[0] && plissken.coords[s][1] == left[1]) {
                        found = true;
                        console.log("found body");
                    }
                }
                if(!found) {
                    console.log("move left ok");
                    possible_moves++;
                    moves[possible_moves] = "left";
                }
            }

            found = false;
            if (plissken.coords[0][1] != 0) { // test up
                var up = [plissken.coords[0][0],plissken.coords[0][1]-1];
                console.log("up coord: ".concat(up));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == up[0] && plissken.coords[s][1] == up[1]) {
                        found = true;
                        console.log("found body");
                    }
                }
                if(!found) {
                    console.log("move up ok");
                    possible_moves++;
                    moves[possible_moves] = "up";
                }
            }

            found = false;
            if (plissken.coords[0][1] != height - 1) { // test down
                var down = [plissken.coords[0][0],plissken.coords[0][1]+1];
                console.log("down coord: ".concat(up));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == down[0] && plissken.coords[s][1] == down[1]) {
                        found = true;
                        console.log("found body");
                    }
                }
                if(!found) {
                    console.log("move down ok");
                    possible_moves++;
                    moves[possible_moves] = "down";
                }
            }

            console.log("possible moves: " + possible_moves);
            if (possible_moves > -1) {
                for (var i = 0; i < moves.length; i++) {
                    console.log(moves[i]);
                }
                random_choice = Math.floor(Math.random() * moves.length);
                console.log("random_choice: "+random_choice);
                return moves[random_choice];
            }
            else {
                return "down"
            }

        }
    }

    function move3() { // move3 random 'safe' moves, but picks up food if adjacent
        if(plissken === null) {
            // Response data, one of: ["up", "down", "left", "right"]
            return "down";
        }
        else {
            var s = 0;
            var moves = [];
            var moves_coord = [];
            var found = false;
            var possible_moves = -1;

            console.log("head: ".concat(plissken.coords[0]));
            console.log("x: ".concat(plissken.coords[0][0]));
            console.log("y: ".concat(plissken.coords[0][1]));


            if (plissken.coords[0][0] != width - 1) { // test right
                var right = [plissken.coords[0][0]+1,plissken.coords[0][1]];
                console.log("right coord: ".concat(right));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == right[0] && plissken.coords[s][1] == right[1]) {
                        found = true;
                        console.log("found body");
                        break;
                    }
                }
                if(!found) {
                    console.log("move right ok");
                    possible_moves++;
                    moves[possible_moves] = "right";
                    moves_coord[possible_moves] = right;
                }
            }

            found = false;
            if (plissken.coords[0][0] != 0) { // test left
                var left = [plissken.coords[0][0]-1,plissken.coords[0][1]];
                console.log("left coord: ".concat(left));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == left[0] && plissken.coords[s][1] == left[1]) {
                        found = true;
                        console.log("found body");
                        break;
                    }
                }
                if(!found) {
                    console.log("move left ok");
                    possible_moves++;
                    moves[possible_moves] = "left";
                    moves_coord[possible_moves] = left;
                }
            }

            found = false;
            if (plissken.coords[0][1] != 0) { // test up
                var up = [plissken.coords[0][0],plissken.coords[0][1]-1];
                console.log("up coord: ".concat(up));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == up[0] && plissken.coords[s][1] == up[1]) {
                        found = true;
                        console.log("found body");
                        break;
                    }
                }
                if(!found) {
                    console.log("move up ok");
                    possible_moves++;
                    moves[possible_moves] = "up";
                    moves_coord[possible_moves] = up;
                }
            }

            found = false;
            if (plissken.coords[0][1] != height - 1) { // test down
                var down = [plissken.coords[0][0],plissken.coords[0][1]+1];
                console.log("down coord: ".concat(up));
                for(s = 1; s < plissken.coords.length; s++) {
                    console.log("our body coords:".concat(plissken.coords[s]));
                    if(plissken.coords[s][0] == down[0] && plissken.coords[s][1] == down[1]) {
                        found = true;
                        console.log("found body");
                        break;
                    }
                }
                if(!found) {
                    console.log("move down ok");
                    possible_moves++;
                    moves[possible_moves] = "down";
                    moves_coord[possible_moves] = down;
                }
            }

            console.log("possible moves: " + possible_moves);

            if (possible_moves > -1) {
                for (var i = 0; i < moves.length; i++) {
                    console.log(moves[i]);
                }

                var best_move = null;
                for (var i = 0; i < moves.length && best_move == null; i++) {
                    for (var j = 0; j < food.length; j++) {
                        if(food[j][0] == moves_coord[i][0] && food[j][1] == moves_coord[i][1]) {
                            best_move = moves[i]; // found food, make this best move
                            console.log("found food, best move: ".concat(moves[i]));
                            break;
                        }
                    }
                }
                if (best_move == null) {
                    random_choice = Math.floor(Math.random() * moves.length);
                    console.log("random_choice: " + random_choice);
                    return moves[random_choice];
                }
                else {
                    return best_move;
                }
            }
            else {  // no possible move. just go down
                return "down"
            }

        }
    }

    var mv = move3();
    console.log("mv: ".concat(mv));


    var data = {
        move: mv,
        taunt: config.snake.taunt.move
    };
    console.log("move response:");
    console.log(data);
  return res.json(data);
});

// Handle POST request to '/end'
router.post(config.routes.end, function (req, res) {
  // Do something here to end your snake's session
    console.log("received end request:");
  // We don't need a response so just send back a 200
  res.status(200);
  res.end();
  return;
});


module.exports = router;
