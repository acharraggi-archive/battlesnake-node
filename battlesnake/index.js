"use strict";
var _ = require('lodash');
const winston = require('winston');
winston.level = 'debug';

const max_depth = 10;

function check_snakes(point,snakes) {  // returns true if a snake was found
    winston.log('debug', 'battlesnake check_snakes new called');
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
        }
        // else {    // check for head to head
        //     //todo: move this to own function, test separately.
        //     winston.log('debug', 'check for head hits');
        //     if(snakes[i].id != me) { //ignore my snake
        //         if((snakes[i].coords[0][0]+1 == point[0] && snakes[i].coords[0][1] == point[1]) ||
        //             (snakes[i].coords[0][0]-1 == point[0] && snakes[i].coords[0][1] == point[1]) ||
        //             (snakes[i].coords[0][0] == point[0] && snakes[i].coords[0][1]+1 == point[1]) ||
        //             (snakes[i].coords[0][0] == point[0] && snakes[i].coords[0][1]-1 == point[1])) {
        //
        //             if(snakes[i].health_points < snake.health_points) {
        //                 winston.log('debug', 'found head, but safe', {"snake":i, "point": point});
        //             } else {
        //                 found = true;   // possible head to head
        //                 winston.log('debug', 'found head, avoid', {"snake":i, "point": point});
        //             }
        //         }
        //     }
        // }
    }
    winston.log('debug', 'check_snakes result:', found);
    return found;
}

function basic_moves(my_snake,snakes,width,height) {
    winston.log('debug', 'battlesnake basic_moves called, my_snake',my_snake);
    var found = false;
    var snake = snakes[my_snake];
    var moves = [];
    if (snake.coords[0][0] != width - 1) { // test right for wall
        var right = [snake.coords[0][0]+1,snake.coords[0][1]];
        found = check_snakes(right,snakes);  // then test for snake bodies
        if(!found) {
            //moves.push({"move":"right","coords":right})
            moves.push("right");
        }
    }

    found = false;
    if (snake.coords[0][0] != 0) { // test left for wall
        var left = [snake.coords[0][0]-1,snake.coords[0][1]];
        found = check_snakes(left,snakes); // then test for snake bodies
        if(!found) {
            //moves.push({"move":"left","coords":left})
            moves.push("left");
        }
    }

    found = false;
    if (snake.coords[0][1] != 0) { // test up for wall
        var up = [snake.coords[0][0],snake.coords[0][1]-1];
        found = check_snakes(up,snakes); // then test for snake bodies
        if(!found) {
            //moves.push({"move":"up","coords":up})
            moves.push("up");
        }
    }

    found = false;
    if (snake.coords[0][1] != height - 1) { // test down for wall
        var down = [snake.coords[0][0],snake.coords[0][1]+1];
        found = check_snakes(down,snakes); // then test for snake bodies
        if(!found) {
            //moves.push({"move":"down","coords":down});
            moves.push("down");
        }
    }
    return moves;
}

var BattleSnake = {
    my_snake : 0,   // my snakes offset
    me : null,      // my uuid
    snakes : [],
    height : 0,
    width : 0,
    food : [],
    turn : 0,
    start_turn : 0,

    new : function (my_s,m,s,h,w,f,t) {
        winston.log('debug', 'BattleSnake new called');
        this.my_snake = my_s;
        this.me = m;
        this.snakes = s;
        this.height = h;
        this.width = w;
        this.food = f;
        this.turn = t;
        this.start_turn = t;
    },

    availableMoves : function () {
        winston.log('debug', 'BattleSnake availableMoves called');

        var am = basic_moves(this.my_snake,this.snakes,this.width,this.height,this.me);
        winston.log('debug', 'available moves', am);
        return am;
    },

    whoseMove : function() {
        winston.log('debug', 'BattleSnake whoseMove called');
        return 0;
    },

    makeMove : function (move) {
        winston.log('debug', 'BattleSnake makeMove called. Move=', move);
        // if (this.square[move] == 'X' || this.square[move] == 'O') {
        //     // illegal move
        //     winston.log('error', "attempted move to square already taken");
        // }
        // this.square[move] = this.square[0]; // make move
        // if (this.square[0] == 'X') {        // swap current player
        //     this.square[0] = 'O';
        // }
        // else {
        //     this.square[0] = 'X';
        // }
        this.turn = this.turn + 1;
    },

    checkwin : function () {
        winston.log('debug', 'BattleSnake checkwin called');
        if(this.my_snake == null) {
            return 0;   //I'm dead
        }
        // else if (this.snakes.length = 1) { // all other snakes dead
        //     return 1;
        // }
        else if (this.turn - this.start_turn > max_depth) {  // survived for xx rounds, that's good enough
            return 1;
        }
        else  {   // still alive, keep checking
            return -1
        }
    }
};

exports.BattleSnake = BattleSnake;


