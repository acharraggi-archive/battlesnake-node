"use strict";
var _ = require('lodash');
const winston = require('winston');
winston.level = 'debug';

var TreeNode = {
    epsilon : 1e-6,
    Cp : 2 * (1 / Math.sqrt(2)),
    children : [],
    nVisits : 0,
    totValue : 0,
    gameState : null,

    new: function(gs) {
        winston.log('debug', 'Treenode new called');
        this.gameState = gs;
    },

    isLeaf : function () {
        winston.log('debug', 'Treenode isLeaf called');
        return this.children.length == 0;
    },

    updateStats : function (value) {
        winston.log('debug', 'Treenode updateStats called');
        this.nVisits++;
        this.totValue += value;
    },

    arity : function () {
        winston.log('debug', 'Treenode arity called');
        return this.children.length;
    },

    expand : function () {
        winston.log('debug', 'Treenode expand called');
        var am = [];
        am = this.gameState.availableMoves();
        winston.log('debug', 'Treenode expand available moves: ', am);
        if (am.length > 0) {
            for(var i=0; i < am.length; i++) {
                winston.log('debug', 'Treenode expand make child for move: ', am[i]);
                this.children[i] = _.cloneDeep(this);
                this.children[i].gameState.makeMove(am[i]);
            }
        }
    },

    selectAction : function() {
        winston.log('debug', 'Treenode selectAction called');
        var visited = [];
        var cur = this;
        var temp_value,k;
        visited.push(this);   //visited.add(this);
        while (!cur.isLeaf()) {
            cur = cur.select();
            winston.log('debug', 'Treenode in cur.isleaf loop');
            visited.push(cur); //visited.add(cur);
        }
        if (cur.gameState.checkwin() === -1)  // non-terminal state
        {
            winston.log('debug', 'Treenode selectAction non-terminal state');
            cur.expand();
            winston.log('debug', 'Treenode selectAction after expand, children length=',this.children.length);
            var newNode = cur.select();
            if(newNode != null) {
                winston.log('debug', 'Treenode selectAction newNode != null');
                visited.push(newNode); //visited.add(newNode);
                temp_value = newNode.rollOut(newNode.gameState);
                for(k=0; k < visited.length; k++) {
                    visited[k].updateStats(temp_value);
                }
            }
            else {
                winston.log('error', 'select action selected a null node');
            }
        }
        else {
            winston.log('debug', 'Treenode selectAction terminal state');
            temp_value = 0;
            switch(cur.gameState.checkwin()){
                case 1 : // we have a winner
                        temp_value = 1;
                    break;
                case 0 : // draw
                    temp_value = 0;
                    break;
                default : /* keep playing - should not happen*/
                    //Debug.Log ("keep playing");
                    break;
            }
            for(k=0; k < visited.length; k++) {
                visited[k].updateStats(temp_value);
            }
        }
    },

    select : function() {
        winston.log('debug', 'Treenode select called');
        var selected = null;
        var bestValue = -987654321;
        var bestJ = 0;
        for(var j=0; j < this.children.length; j++) {
            var uctValue =
                this.children[j].totValue / (this.children[j].nVisits + this.epsilon ) +
                this.Cp*Math.sqrt(2*Math.log(this.nVisits+1) / (this.children[j].nVisits + this.epsilon) ) +
                Math.random() * this.epsilon;
            //winston.log('debug', 'Treenode uctValue = ', uctValue);
            if (uctValue > bestValue) {
                selected = this.children[j];
                bestValue = uctValue;
                bestJ = j;
            }
        }
        winston.log('debug', 'Treenode selected',{"bestValue":bestValue,"bestJ":bestJ});
        return selected;
    },

    rollOut : function (gs) {
        //winston.log('debug', 'Treenode rollOut called, gs.square=',gs.square);
        var rollGS = _.cloneDeep(gs);
        var stillPlaying = true;
        var rc = 0;
        var move;
        var ro_am = rollGS.availableMoves();
        while ((ro_am.length > 0) && stillPlaying) {
            winston.log('debug', 'Treenode rollOut ro_am:', ro_am);
            move = _.random(ro_am.length);   // make a random move
            winston.log('debug', 'Treenode rollOut ro_am[move]=',ro_am[move]);
            rollGS.makeMove(ro_am[move]);    // make a random move
            //winston.log('debug', 'Treenode rollOut rollGS=',rollGS.square);
            switch(rollGS.checkwin()){
                case 1 : // we have a winner
                    winston.log('debug', 'Treenode rollOut winner');
                    stillPlaying = false;

                    //if(rollGS.whoseMove() == 'X') { // we won
                        rc = 1.0;
                    //}
                    break;
                case 0 : // draw
                    winston.log('debug', 'Treenode rollOut draw');
                    stillPlaying = false;
                    rc = 0.0; // better than a loss
                    break;
                default : /* keep playing */
                    //Debug.Log ("keep playing");
                    //rc = -1; // try to make it avoid losing
                    ro_am = rollGS.availableMoves();
                    //winston.log('debug', 'Treenode rollOut ro_am in loop:', ro_am);
                    break;
            }
        }
        winston.log('debug', 'Treenode end of rollOut, rc=',rc);
        return rc;
    }
};
exports.TreeNode = TreeNode;

