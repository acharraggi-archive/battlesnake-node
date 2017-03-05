"use strict";
var config  = require('./config.json');
const winston = require('winston');
winston.level = 'debug';
var TreeNode = require('./treenode').TreeNode;
var BattleSnake = require('./battlesnake').BattleSnake;
var _ = require('lodash');

module.exports.move1 = function move1(turn,width,snake)  { // move1 moves left or right at start and keeps going
    winston.log('debug', 'move1 called', "test");

    if(turn == 0) {
        if(snake.coords[0][0] == (width-1) || (snake.coords[0][0] != 0 && snake.coords[0][0] < width/2)) {
            return "left";
        }
        else {
            return "right";
        }
    }
    else {  // keep heading same direction
        if(snake.coords[0][0] < snake.coords[1][0]) {    // we're heading left
            return "left";
        }
        else {
            return "right";
        }
    }
};


module.exports.move2 =  function move2(width,height,snake) { // move2 random 'safe' moves
    winston.log('debug', 'move2 called, snake:', snake);

        var i,s;
        var moves = [];
        var found = false;
        var possible_moves = -1;

        if (snake.coords[0][0] != width - 1) { // test right
            var right = [snake.coords[0][0]+1,snake.coords[0][1]];
            //console.log("right coord: ".concat(right));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == right[0] && snake.coords[s][1] == right[1]) {
                    found = true;
                    //console.log("found body");
                }
            }
            if(!found) {
                //console.log("move right ok");
                possible_moves++;
                moves[possible_moves] = "right";
            }
        }

        found = false;
        if (snake.coords[0][0] != 0) { // test left
            var left = [snake.coords[0][0]-1,snake.coords[0][1]];
            //console.log("left coord: ".concat(left));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == left[0] && snake.coords[s][1] == left[1]) {
                    found = true;
                    //console.log("found body");
                }
            }
            if(!found) {
                //console.log("move left ok");
                possible_moves++;
                moves[possible_moves] = "left";
            }
        }

        found = false;
        if (snake.coords[0][1] != 0) { // test up
            var up = [snake.coords[0][0],snake.coords[0][1]-1];
            //console.log("up coord: ".concat(up));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == up[0] && snake.coords[s][1] == up[1]) {
                    found = true;
                    //console.log("found body");
                }
            }
            if(!found) {
                //console.log("move up ok");
                possible_moves++;
                moves[possible_moves] = "up";
            }
        }

        found = false;
        if (snake.coords[0][1] != height - 1) { // test down
            var down = [snake.coords[0][0],snake.coords[0][1]+1];
            //console.log("down coord: ".concat(up));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == down[0] && snake.coords[s][1] == down[1]) {
                    found = true;
                    //console.log("found body");
                }
            }
            if(!found) {
                //console.log("move down ok");
                possible_moves++;
                moves[possible_moves] = "down";
            }
        }

        //console.log("possible moves: " + possible_moves);
        if (possible_moves > -1) {
            for (i = 0; i < moves.length; i++) {
                //console.log(moves[i]);
            }
            var random_choice = Math.floor(Math.random() * moves.length);
            //console.log("random_choice: "+random_choice);
            return moves[random_choice];
        }
        else {
            return "down"
        }

};


module.exports.move3 = function move3(width,height,food,snake) { // move3 random 'safe' moves, but picks up food if adjacent
    winston.log('debug', 'move3 called, snake:', snake);
    if(snake === null) {
        // Response data, one of: ["up", "down", "left", "right"]
        return "down";
    }
    else {
        var i,j,s = 0;
        var moves = [];
        var moves_coord = [];
        var found = false;
        var possible_moves = -1;

        if (snake.coords[0][0] != width - 1) { // test right
            var right = [snake.coords[0][0]+1,snake.coords[0][1]];
            //console.log("right coord: ".concat(right));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == right[0] && snake.coords[s][1] == right[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move right ok");
                possible_moves++;
                moves[possible_moves] = "right";
                moves_coord[possible_moves] = right;
            }
        }

        found = false;
        if (snake.coords[0][0] != 0) { // test left
            var left = [snake.coords[0][0]-1,snake.coords[0][1]];
            //console.log("left coord: ".concat(left));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == left[0] && snake.coords[s][1] == left[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move left ok");
                possible_moves++;
                moves[possible_moves] = "left";
                moves_coord[possible_moves] = left;
            }
        }

        found = false;
        if (snake.coords[0][1] != 0) { // test up
            var up = [snake.coords[0][0],snake.coords[0][1]-1];
            //console.log("up coord: ".concat(up));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == up[0] && snake.coords[s][1] == up[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move up ok");
                possible_moves++;
                moves[possible_moves] = "up";
                moves_coord[possible_moves] = up;
            }
        }

        found = false;
        if (snake.coords[0][1] != height - 1) { // test down
            var down = [snake.coords[0][0],snake.coords[0][1]+1];
            //console.log("down coord: ".concat(up));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == down[0] && snake.coords[s][1] == down[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move down ok");
                possible_moves++;
                moves[possible_moves] = "down";
                moves_coord[possible_moves] = down;
            }
        }

        //console.log("possible moves: " + possible_moves);

        if (possible_moves > -1) {
            //for (var i = 0; i < moves.length; i++) {
            //    console.log(moves[i]);
            //}

            var best_move = null;
            for (i = 0; i < moves.length && best_move == null; i++) {
                for (j = 0; j < food.length; j++) {
                    if(food[j][0] == moves_coord[i][0] && food[j][1] == moves_coord[i][1]) {
                        best_move = moves[i]; // found food, make this best move
                        //console.log("found food, best move: ".concat(moves[i]));
                        break;
                    }
                }
            }
            if (best_move == null) {
                var random_choice = Math.floor(Math.random() * moves.length);
                //console.log("random_choice: " + random_choice);
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
};


module.exports.move4 = function move4(in_req) { // move4 moves safely towards nearest food
    var snake = null;
    var me = in_req.you;
    var height = in_req.height;
    var width = in_req.width;

    var snakes = in_req.snakes;
    var food = in_req.food;
    var i,j,k,m,x,s;

    function compute_distance(point2) {
        var x_dist = Math.abs(point1[0] - point2[0]);
        var y_dist = Math.abs(point1[1] - point2[1]);
        return x_dist + y_dist;
    }

    for(i = 0; i < snakes.length; i++) {
        if(snakes[i].id == me) {
            snake = snakes[i];
            break;  // stop loop once found
        }
    }
    if(snake === null) {
        // something's wrong, can't find my id in the list of snakes so just exit with fixed move
        winston.log('error', 'unable to locate my snake', {
            "me: ": me,
            "snakes: " : snakes
        });
        return {move: "down", taunt: config.snake.taunt.end };
    }
    else {
        var moves = [];
        var moves_coord = [];
        var found = false;
        var possible_moves = -1;

        if (snake.coords[0][0] != width - 1) { // test right
            var right = [snake.coords[0][0]+1,snake.coords[0][1]];
            //console.log("right coord: ".concat(right));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == right[0] && snake.coords[s][1] == right[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move right ok");
                possible_moves++;
                moves[possible_moves] = "right";
                moves_coord[possible_moves] = right;
            }
        }

        found = false;
        if (snake.coords[0][0] != 0) { // test left
            var left = [snake.coords[0][0]-1,snake.coords[0][1]];
            //console.log("left coord: ".concat(left));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == left[0] && snake.coords[s][1] == left[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move left ok");
                possible_moves++;
                moves[possible_moves] = "left";
                moves_coord[possible_moves] = left;
            }
        }

        found = false;
        if (snake.coords[0][1] != 0) { // test up
            var up = [snake.coords[0][0],snake.coords[0][1]-1];
            //console.log("up coord: ".concat(up));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == up[0] && snake.coords[s][1] == up[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move up ok");
                possible_moves++;
                moves[possible_moves] = "up";
                moves_coord[possible_moves] = up;
            }
        }

        found = false;
        if (snake.coords[0][1] != height - 1) { // test down
            var down = [snake.coords[0][0],snake.coords[0][1]+1];
            //console.log("down coord: ".concat(up));
            for(s = 1; s < snake.coords.length; s++) {
                //console.log("our body coords:".concat(snake.coords[s]));
                if(snake.coords[s][0] == down[0] && snake.coords[s][1] == down[1]) {
                    found = true;
                    //console.log("found body");
                    break;
                }
            }
            if(!found) {
                //console.log("move down ok");
                possible_moves++;
                moves[possible_moves] = "down";
                moves_coord[possible_moves] = down;
            }
        }

        winston.log('debug', 'possible moves', moves);

        if (possible_moves > -1) {
            var best_move = null;
            var head = snake.coords[0];

            var point1 = head;


            winston.log('debug', 'head: ', head);
            winston.log('debug', 'food: ', food);

            for (i = 0; i < moves.length && best_move == null; i++) {
                for (j = 0; j < food.length; j++) {
                    if(food[j][0] == moves_coord[i][0] && food[j][1] == moves_coord[i][1]) {
                        best_move = moves[i]; // found food, make this best move
                        winston.log('debug', 'found food, best move: ', moves[i]);
                        break;
                    }
                }
            }

            if (best_move == null) {
                var moves_food = [];
                for(k = 0; k < moves_coord.length; k++) {
                    point1 = moves_coord[k];
                    var food_distances = food.map(compute_distance);
                    winston.log('debug', 'food_distances: ', food_distances);
                    var min_food = width+height;
                    var min_food_x = -1;
                    for (x = 0; x < food_distances.length;  x++) {
                        if(food_distances[x] < min_food) {
                            min_food = food_distances[x];
                            min_food_x = x;
                        }
                    }
                    winston.log('debug', 'min_food: ', {"min_food": min_food, "min_food_x":min_food_x});
                    moves_food[k] = min_food;
                }
                var best_food_move = height+width;
                for(m = 0; m<moves_food.length; m++){
                    if(moves_food[m] < best_food_move) {
                        best_move = moves[m];
                        best_food_move = moves_food[m];
                    }
                }

                return {move: best_move, taunt:config.snake.taunt.move};       // based on food distance
            }
            else {
                return {move: best_move, taunt:"Thanks for the snack"};       // based on being adjacent to food
            }
        }
        else {  // no possible move. just go down
            return {move: "down", taunt: config.snake.taunt.end };
        }

    }
};



module.exports.move5 = function move4(in_req) { // move5 moves safely towards nearest food, tries to avoid other snakes
    var snake = null;
    var me = in_req.you;
    var height = in_req.height;
    var width = in_req.width;
    var snakes = in_req.snakes;
    var food = in_req.food;
    var i,j,k,m,x;

    function compute_distance(point2) {
        var x_dist = Math.abs(point1[0] - point2[0]);
        var y_dist = Math.abs(point1[1] - point2[1]);
        return x_dist + y_dist;
    }

    function check_snakes(point) {
        var found = false;
        var j,k;
        for (k = 0; k < snakes.length; k++) {
            for (j = 0; j < snakes[k].coords; j++) {
                if(snakes[k].coords[j][0] == point[0] && snakes[k].coords[j][1] == point[1]) {
                    found = true;
                    winston.log('debug', 'found point', {"snake":k, "coords":j, "point": point});
                    break;
                }
            }
            if (found) { break}
        }
        return found;
    }

    for(i = 0; i < snakes.length; i++) {
        if(snakes[i].id == me) {
            snake = snakes[i];
            break;  // stop loop once found
        }
    }
    if(snake === null) {
        // something's wrong, can't find my id in the list of snakes so just exit with fixed move
        winston.log('error', 'unable to locate my snake', {
            "me: ": me,
            "snakes: " : snakes
        });
        return {move: "down", taunt: config.snake.taunt.end };
    }
    else {
        var moves = [];
        var moves_coord = [];
        var found = false;
        var possible_moves = -1;


        if (snake.coords[0][0] != width - 1) { // test right
            var right = [snake.coords[0][0]+1,snake.coords[0][1]];
            found = check_snakes(right);
            //console.log("right coord: ".concat(right));
            // for(var s = 1; s < snake.coords.length; s++) {
            //     //console.log("our body coords:".concat(snake.coords[s]));
            //     if(snake.coords[s][0] == right[0] && snake.coords[s][1] == right[1]) {
            //         found = true;
            //         //console.log("found body");
            //         break;
            //     }
            // }
            if(!found) {
                console.log("move right ok");
                possible_moves++;
                moves[possible_moves] = "right";
                moves_coord[possible_moves] = right;
            }
        }

        found = false;
        if (snake.coords[0][0] != 0) { // test left
            var left = [snake.coords[0][0]-1,snake.coords[0][1]];
            found = check_snakes(left);
            //console.log("left coord: ".concat(left));
            // for(s = 1; s < snake.coords.length; s++) {
            //     //console.log("our body coords:".concat(snake.coords[s]));
            //     if(snake.coords[s][0] == left[0] && snake.coords[s][1] == left[1]) {
            //         found = true;
            //         //console.log("found body");
            //         break;
            //     }
            // }
            if(!found) {
                //console.log("move left ok");
                possible_moves++;
                moves[possible_moves] = "left";
                moves_coord[possible_moves] = left;
            }
        }

        found = false;
        if (snake.coords[0][1] != 0) { // test up
            var up = [snake.coords[0][0],snake.coords[0][1]-1];
            found = check_snakes(up);
            //console.log("up coord: ".concat(up));
            // for(s = 1; s < snake.coords.length; s++) {
            //     //console.log("our body coords:".concat(snake.coords[s]));
            //     if(snake.coords[s][0] == up[0] && snake.coords[s][1] == up[1]) {
            //         found = true;
            //         //console.log("found body");
            //         break;
            //     }
            // }
            if(!found) {
                //console.log("move up ok");
                possible_moves++;
                moves[possible_moves] = "up";
                moves_coord[possible_moves] = up;
            }
        }

        found = false;
        if (snake.coords[0][1] != height - 1) { // test down
            var down = [snake.coords[0][0],snake.coords[0][1]+1];
            found = check_snakes(down);
            //console.log("down coord: ".concat(up));
            // for(s = 1; s < snake.coords.length; s++) {
            //     //console.log("our body coords:".concat(snake.coords[s]));
            //     if(snake.coords[s][0] == down[0] && snake.coords[s][1] == down[1]) {
            //         found = true;
            //         //console.log("found body");
            //         break;
            //     }
            // }
            if(!found) {
                //console.log("move down ok");
                possible_moves++;
                moves[possible_moves] = "down";
                moves_coord[possible_moves] = down;
            }
        }

        winston.log('debug', 'possible moves', moves);

        if (possible_moves > -1) {
            var best_move = null;
            var head = snake.coords[0];

            var point1 = head;
            winston.log('debug', 'head: ', head);
            winston.log('debug', 'food: ', food);

            for (i = 0; i < moves.length && best_move == null; i++) {
                for (j = 0; j < food.length; j++) {
                    if(food[j][0] == moves_coord[i][0] && food[j][1] == moves_coord[i][1]) {
                        best_move = moves[i]; // found food, make this best move
                        winston.log('debug', 'found food, best move: ', moves[i]);
                        break;
                    }
                }
            }

            if (best_move == null) {
                var moves_food = [];
                for(k = 0; k < moves_coord.length; k++) {
                    point1 = moves_coord[k];
                    var food_distances = food.map(compute_distance);
                    winston.log('debug', 'food_distances: ', food_distances);
                    var min_food = width+height;
                    var min_food_x = -1;
                    for (x = 0; x < food_distances.length;  x++) {
                        if(food_distances[x] < min_food) {
                            min_food = food_distances[x];
                            min_food_x = x;
                        }
                    }
                    winston.log('debug', 'min_food: ', {"min_food": min_food, "min_food_x":min_food_x});
                    moves_food[k] = min_food;
                }
                var best_food_move = height+width;
                for(m = 0; m<moves_food.length; m++){
                    if(moves_food[m] < best_food_move) {
                        best_move = moves[m];
                        best_food_move = moves_food[m];
                    }
                }

                return {move: best_move, taunt:config.snake.taunt.move};       // based on food distance
            }
            else {
                return {move: best_move, taunt:"Thanks for the snack"};       // based on being adjacent to food
            }
        }
        else {  // no possible move. just go down
            return {move: "down", taunt: config.snake.taunt.end };
        }

    }
};

function return_taunt(turn) {
    return config.taunts.taunt[Math.floor(turn / 5) % config.taunts.taunt.length];
    // 5 is a nice number for the taunt refresh rate, will depend on the game turn frequency
}



module.exports.move6 = function move6(in_req) { // move6 moves safely avoiding snakes and walls
    var snake = null;
    var me = in_req.you;
    var height = in_req.height;
    var width = in_req.width;
    var snakes = in_req.snakes;
    var food = in_req.food;
    var turn = in_req.turn;
    var i,j;

    winston.log('debug', 'move6 called');

    function check_snakes(point) {  // returns true if a snake was found
        var found = false;
        var i,j;
        winston.log('debug', 'point: ', point);
        for (i=0; i < snakes.length; i++) {
            for (j=0; j < snakes[i].coords.length; j++) {
                if(snakes[i].coords[j][0] == point[0] && snakes[i].coords[j][1] == point[1]) {
                    //test for tail, will be free unless near start or just ate food
                    if( (snakes[i].coords.length-1 == j) && // point was the snake tail
                        // test if tail-1 is not at the same coords, if so then this point will be free
                        ((snakes[i].coords[j][0] != snakes[i].coords[j-1][0]) ||  // x
                        (snakes[i].coords[j][1] != snakes[i].coords[j-1][1]))) {  // y
                        winston.log('debug', 'found safe tail point', {"snake": i, "coords": j, "point": point});
                    }
                    else {
                        found = true;
                        winston.log('debug', 'found snake', {"snake": i, "coords": j, "point": point});
                        break;
                    }
                }
            }

            if (found == true) {
                break;
            } else {    // check for head to head
                //todo: move this to own function, test separately.
                winston.log('debug', 'check for head hits');
                if(snakes[i].id != me) { //ignore my snake
                    if((snakes[i].coords[0][0]+1 == point[0] && snakes[i].coords[0][1] == point[1]) ||
                        (snakes[i].coords[0][0]-1 == point[0] && snakes[i].coords[0][1] == point[1]) ||
                        (snakes[i].coords[0][0] == point[0] && snakes[i].coords[0][1]+1 == point[1]) ||
                        (snakes[i].coords[0][0] == point[0] && snakes[i].coords[0][1]-1 == point[1])) {

                        if(snakes[i].health_points < snake.health_points) {
                            winston.log('debug', 'found head, but safe', {"snake":i, "point": point});
                        } else {
                            found = true;   // possible head to head
                            winston.log('debug', 'found head, avoid', {"snake":i, "point": point});
                        }
                    }
                }
            }
        }
        winston.log('debug', 'check_snakes result:', found);
        return found;
    }

    // locate my snake info, set var snake
    for(i = 0; i < snakes.length; i++) {
        if(snakes[i].id == me) {
            snake = snakes[i];
            break;  // stop loop once found
        }
    }
    if(snake === null) {
        // something's wrong, can't find my id in the list of snakes so just exit with fixed move
        winston.log('error', 'unable to locate my snake', {
            "me: ": me,
            "snakes: " : snakes
        });
        return {move: "down", taunt: config.snake.taunt.end };
    }
    else {
        winston.log('debug', 'found my snake', snake);
         var moves = [];
        var moves_coord = [];
        var found = false;
        var possible_moves = -1;


        if (snake.coords[0][0] != width - 1) { // test right for wall
            var right = [snake.coords[0][0]+1,snake.coords[0][1]];
            found = check_snakes(right);  // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "right";
                moves_coord[possible_moves] = right;
            }
        }

        found = false;
        if (snake.coords[0][0] != 0) { // test left for wall
            var left = [snake.coords[0][0]-1,snake.coords[0][1]];
            found = check_snakes(left); // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "left";
                moves_coord[possible_moves] = left;
            }
        }

        found = false;
        if (snake.coords[0][1] != 0) { // test up for wall
            var up = [snake.coords[0][0],snake.coords[0][1]-1];
            found = check_snakes(up); // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "up";
                moves_coord[possible_moves] = up;
            }
        }

        found = false;
        if (snake.coords[0][1] != height - 1) { // test down for wall
            var down = [snake.coords[0][0],snake.coords[0][1]+1];
            found = check_snakes(down); // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "down";
                moves_coord[possible_moves] = down;
            }
        }

        winston.log('debug', 'possible moves', moves);

        if (possible_moves > -1) {
            var food_move = null;

            var random_choice = Math.floor(Math.random() * moves.length);
            winston.log('debug', 'random move: ', moves[random_choice]);

            // test if that moves to food
            for (j = 0; j < food.length; j++) {
                if(food[j][0] == moves_coord[random_choice][0] && food[j][1] == moves_coord[random_choice][1]) {
                    food_move = moves[random_choice]; // found food, make this best move
                    winston.log('debug', 'found food: ', moves[i]);
                    break;
                }
            }

            if (food_move != null) {
                return {move: food_move, taunt:"Thanks for the snack"};       // change taunt for food
            }
            else {
                return {move: moves[random_choice], taunt: return_taunt(turn)};       // random move
            }
        }
        else {  // no possible move. just go down
            return {move: "down", taunt: config.snake.taunt.end };
        }

    }
};

module.exports.move7 = function move7(in_req) { // move7 select move via MCTS
    winston.log('debug', 'move7 called');
    var my_snake = null;
    var me = in_req.you;
    var height = in_req.height;
    var width = in_req.width;
    var snakes = in_req.snakes;
    var food = in_req.food;
    var turn = in_req.turn;
    var i,j;

    // locate my snake info, set var snake
    for(i = 0; i < snakes.length; i++) {
        if(snakes[i].id == me) {
            my_snake = i;
            break;
        }
    }
    if(my_snake === null) {
        // something's wrong, can't find my id in the list of snakes so just exit with fixed move
        winston.log('error', 'unable to locate my snake', {
            "me: ": me,
            "snakes: " : snakes
        });
        return {move: "down", taunt: config.snake.taunt.end };
    }
    else {
        winston.log('debug', 'move7 total snakes =',snakes.length);
        var g = BattleSnake;
        g.new(my_snake,me,snakes,height,width,food,turn);

        var treenode = TreeNode;
        treenode.new(g);

        winston.log('debug', 'move7 about to call selectAction');
        console.log(treenode.selectAction());
        console.log(treenode.selectAction());
        console.log(treenode.selectAction());
        console.log(treenode.selectAction());
        console.log(treenode.selectAction());
        console.log(treenode.selectAction());
        console.log(treenode.selectAction());
        console.log(treenode.selectAction());

        for (var x = 0; x < treenode.children.length; x++) {
            winston.log('debug', 'move7 child', {
                "child#": x,
                "nVisits": treenode.children[x].nVisits,
                "totValue": treenode.children[x].totValue
            });
        }
        return {move: "down", taunt: config.snake.taunt.end };  // dummy move
    }
};

module.exports.move8 = function move6(in_req) { // move6 moves safely avoiding snakes and walls, gets hungry
    var snake = null;
    var me = in_req.you;
    var height = in_req.height;
    var width = in_req.width;
    var snakes = in_req.snakes;
    var food = in_req.food;
    var turn = in_req.turn;
    var i,j,k,m,x;

    winston.log('debug', 'move6 called');

    function compute_distance(point2) {
        var x_dist = Math.abs(point1[0] - point2[0]);
        var y_dist = Math.abs(point1[1] - point2[1]);
        return x_dist + y_dist;
    }

    function check_snakes(point) {  // returns true if a snake was found
        var found = false;
        var i,j;
        winston.log('debug', 'point: ', point);
        for (i=0; i < snakes.length; i++) {
            for (j=0; j < snakes[i].coords.length; j++) {
                if(snakes[i].coords[j][0] == point[0] && snakes[i].coords[j][1] == point[1]) {
                    //test for tail, will be free unless near start or just ate food
                    if( (snakes[i].coords.length-1 == j) && // point was the snake tail
                        // test if tail-1 is not at the same coords, if so then this point will be free
                        ((snakes[i].coords[j][0] != snakes[i].coords[j-1][0]) ||  // x
                        (snakes[i].coords[j][1] != snakes[i].coords[j-1][1]))) {  // y
                        winston.log('debug', 'found safe tail point', {"snake": i, "coords": j, "point": point});
                    }
                    else {
                        found = true;
                        winston.log('debug', 'found snake', {"snake": i, "coords": j, "point": point});
                        break;
                    }
                }
            }

            if (found == true) {
                break;
            } else {    // check for head to head
                //todo: move this to own function, test separately.
                winston.log('debug', 'check for head hits');
                if(snakes[i].id != me) { //ignore my snake
                    if((snakes[i].coords[0][0]+1 == point[0] && snakes[i].coords[0][1] == point[1]) ||
                        (snakes[i].coords[0][0]-1 == point[0] && snakes[i].coords[0][1] == point[1]) ||
                        (snakes[i].coords[0][0] == point[0] && snakes[i].coords[0][1]+1 == point[1]) ||
                        (snakes[i].coords[0][0] == point[0] && snakes[i].coords[0][1]-1 == point[1])) {

                        if(snakes[i].health_points < snake.health_points) {
                            winston.log('debug', 'found head, but safe', {"snake":i, "point": point});
                        } else {
                            found = true;   // possible head to head
                            winston.log('debug', 'found head, avoid', {"snake":i, "point": point});
                        }
                    }
                }
            }
        }
        winston.log('debug', 'check_snakes result:', found);
        return found;
    }

    // locate my snake info, set var snake
    for(i = 0; i < snakes.length; i++) {
        if(snakes[i].id == me) {
            snake = snakes[i];
            break;  // stop loop once found
        }
    }
    if(snake === null) {
        // something's wrong, can't find my id in the list of snakes so just exit with fixed move
        winston.log('error', 'unable to locate my snake', {
            "me: ": me,
            "snakes: " : snakes
        });
        return {move: "down", taunt: config.snake.taunt.end };
    }
    else {
        winston.log('debug', 'found my snake', snake);
        var moves = [];
        var moves_coord = [];
        var found = false;
        var possible_moves = -1;


        if (snake.coords[0][0] != width - 1) { // test right for wall
            var right = [snake.coords[0][0]+1,snake.coords[0][1]];
            found = check_snakes(right);  // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "right";
                moves_coord[possible_moves] = right;
            }
        }

        found = false;
        if (snake.coords[0][0] != 0) { // test left for wall
            var left = [snake.coords[0][0]-1,snake.coords[0][1]];
            found = check_snakes(left); // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "left";
                moves_coord[possible_moves] = left;
            }
        }

        found = false;
        if (snake.coords[0][1] != 0) { // test up for wall
            var up = [snake.coords[0][0],snake.coords[0][1]-1];
            found = check_snakes(up); // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "up";
                moves_coord[possible_moves] = up;
            }
        }

        found = false;
        if (snake.coords[0][1] != height - 1) { // test down for wall
            var down = [snake.coords[0][0],snake.coords[0][1]+1];
            found = check_snakes(down); // then test for snake bodies
            if(!found) {
                possible_moves++;
                moves[possible_moves] = "down";
                moves_coord[possible_moves] = down;
            }
        }

        winston.log('debug', 'possible moves', moves);

        if (possible_moves > -1) {
            var food_move = null;

            var random_choice = Math.floor(Math.random() * moves.length);
            winston.log('debug', 'random move: ', moves[random_choice]);

            // test if that moves to food
            for (j = 0; j < food.length; j++) {
                if(food[j][0] == moves_coord[random_choice][0] && food[j][1] == moves_coord[random_choice][1]) {
                    food_move = moves[random_choice]; // found food, make this best move
                    winston.log('debug', 'found food: ', moves[i]);
                    break;
                }
            }

            if (food_move != null) {
                return {move: food_move, taunt:"Thanks for the snack"};       // change taunt for food
            }
            else if (snake.health_points < 50) {    // if hungry, look for food
                    var moves_food = [];
                    for(k = 0; k < moves_coord.length; k++) {
                        var point1 = moves_coord[k];
                        var food_distances = food.map(compute_distance);
                        winston.log('debug', 'food_distances: ', food_distances);
                        var min_food = width+height;
                        var min_food_x = -1;
                        for (x = 0; x < food_distances.length;  x++) {
                            if(food_distances[x] < min_food) {
                                min_food = food_distances[x];
                                min_food_x = x;
                            }
                        }
                        winston.log('debug', 'min_food: ', {"min_food": min_food, "min_food_x":min_food_x});
                        moves_food[k] = min_food;
                    }
                    var best_food_move = height+width;
                    for(m = 0; m<moves_food.length; m++){
                        if(moves_food[m] < best_food_move) {
                            food_move = moves[m];
                            best_food_move = moves_food[m];
                        }
                    }

                    return {move: food_move, taunt:config.snake.taunt.hungry};       // based on food distance
                }
             else {
                return {move: moves[random_choice], taunt: return_taunt(turn)};       // random move
            }
        }
        else {  // no possible move. just go down
            return {move: "down", taunt: config.snake.taunt.end };
        }

    }
};