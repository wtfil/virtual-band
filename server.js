var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
app.use(function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
	socket.on('band', function (data) {
		socket.join(data.id);
	});
	socket.on('sync', function (data) {
		socket.broadcast.emit('sync', data);
	});
});

var port = process.env.PORT || 4455;
server.listen(port);
console.log('Server started at http://127.0.0.1:' + port);
