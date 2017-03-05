"use strict";

var config  = require('../config.json');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var move_snake = require('../move_snake.js');

const winston = require('winston');
winston.level = 'debug';

// Handle GET request to '/'
router.get(config.routes.info, function (req, res) {

  // Response data
  var data = {
    color: config.snake.color,
    head_url: config.snake.head_url,
    name: config.snake.name,
    taunt: config.taunts.taunt[0]
  };
  winston.log('debug', '/start response', data);
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

    winston.log('debug', '/start req.body: ', req.body);
    winston.log('debug', 'process.env.PORT: ', process.env.PORT);

    var name_suffix = "";
    var snake_color  = config.snake.color;
    var in_port = process.env.PORT || config.port;      // modify name & colour if using foreman with multiple clients
    winston.log('debug', 'in_port: ', in_port);

    // if(config.port != in_port) {
    //     name_suffix = "(".concat(in_port).concat(")");
    //
    //     switch(in_port) {
    //         case "5001":
    //             snake_color = "#00FF00";
    //             break;
    //         case "5002":
    //             snake_color = "#0000FF";
    //             break;
    //         case "5003":
    //             snake_color = "#FF0000";
    //             break;
    //         case "5004":
    //             snake_color = "#FFFF00";
    //             break;
    //         case "5005":
    //             snake_color = "#00FFFF";
    //             break;
    //         default:
    //             snake_color = "#000000";
    //     }
    // }

  // Response data
  var data = {
    color: snake_color,
    head_url: config.snake.head_url,
    name: config.snake.name.concat(name_suffix),
    taunt: config.taunts.taunt[0],
      head_type: "shades",
      tail_type: "small-rattle"
  };
    winston.log('debug', '/start response', data);
  return res.json(data);
});

// Handle POST request to '/move'
router.post(config.routes.move, function (req, res) {
  // Do something here to generate your move
    // one of: ["up", "down", "left", "right"]

    winston.log('debug', '/move req.body', req.body);

    var data = move_snake.move8(req.body);

    winston.log('info', '/move response', data);
  return res.json(data);
});

// Handle POST request to '/end'
router.post(config.routes.end, function (req, res) {
  // Do something here to end your snake's session
    winston.log('info', 'received /end request', req.body);
  // We don't need a response so just send back a 200
  res.status(200);
  res.end();
});

module.exports = router;
