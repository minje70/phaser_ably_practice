// import express from 'express';
// import { Server } from 'socket.io';
// import http from 'http';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const app = express();
// const server = http.Server(app);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const io = new Server(server);
// app.use(express.static(__dirname + '/public'));
// app.get('/', function (req, res) {
// 	console.log(__dirname);
// 	res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function (socket) {
// 	console.log('a user connected');
// 	socket.on('disconnect', function () {
// 		console.log('user discconected');
// 	});
// });

// server.listen(8085, function () {
// 	console.log(`Listening on ${server.address().port}`);
// });

const express = require('express');

const ioMaker = require('socket.io');
const app = express();
const server = require('http').Server(app);
const io = ioMaker.listen(server);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

server.listen(8081, function () {
	console.log(`Listening on ${server.address().port}`);
});
