"use strict";
var _ = require('lodash');
const winston = require('winston');
winston.level = 'debug';

//var TicTacToe = function () {
    //var self = {};
    //self.square = ['X','1','2','3','4','5','6','7','8','9'];
var TicTacToe = {
    square : ['X','1','2','3','4','5','6','7','8','9'],
// make first position of array indicate who's move it is from this position

        // gameState : function () {
        //     return this.square;
        // },

        availableMoves : function () {
            winston.log('debug', 'TicTacToe availableMoves called');
            var am = [];
            for (var i = 1; i < 10; i++) {
                if (this.square[i] != 'X' && this.square[i] != 'O') {
                    am.push(i);
                }
            }
            return am;
        },

        whoseMove : function() {
        winston.log('debug', 'TicTacToe whoseMove called');
        return this.square[0];
        },

        makeMove : function (move) {
        winston.log('TicTacToe', 'TicTacToe makeMove called. Move=', move);
        if (this.square[move] == 'X' || this.square[move] == 'O') {
            // illegal move
            winston.log('error', "attempted move to square already taken");
        }
            this.square[move] = this.square[0]; // make move
        if (this.square[0] == 'X') {        // swap current player
            this.square[0] = 'O';
        }
        else {
            this.square[0] = 'X';
        }
    },

        checkwin : function () {
        winston.log('TicTacToe', 'TicTacToe checkwin called');
        if (this.square[1] == this.square[2] && this.square[2] == this.square[3])
            return 1;
        else if (this.square[4] == this.square[5] && this.square[5] == this.square[6])
            return 1;
        else if (this.square[7] == this.square[8] && this.square[8] == this.square[9])
            return 1;
        else if (this.square[1] == this.square[4] && this.square[4] == this.square[7])
            return 1;
        else if (this.square[2] == this.square[5] && this.square[5] == this.square[8])
            return 1;
        else if (this.square[3] == this.square[6] && this.square[6] == this.square[9])
            return 1;
        else if (this.square[1] == this.square[5] && this.square[5] == this.square[9])
            return 1;
        else if (this.square[3] == this.square[5] && this.square[5] == this.square[7])
            return 1;
        else if (this.square[1] != '1' && this.square[2] != '2' && this.square[3] != '3'
            && this.square[4] != '4' && this.square[5] != '5' && this.square[6] != '6'
            && this.square[7] != '7' && this.square[8] != '8' && this.square[9] != '9')
            return 0;
        else
            return -1;
    }
    };

exports.TicTacToe = TicTacToe;

