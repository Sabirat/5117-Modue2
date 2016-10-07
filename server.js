var express = require('express');

app = express();

app.use(express.static('public')) 

app.get('/', function(req, res){
    res.sendFile( __dirname + '/' + 'index.html' );
    })

var port = process.env.PORT || 3000; // For when we deploy to Heroku

var server = app.listen(port)
console.log("server up")
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('getTime', function () {
		var systime= new Date().getTime();
		
		socket.emit('systime', systime);
        console.log("Sent to client. Time:"+systime);
    })
})