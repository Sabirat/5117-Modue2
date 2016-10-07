var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://ec2-54-175-174-41.compute-1.amazonaws.com:80/'
var db_name = "5117-individual"
var db_user = "5117user"
var db_pswd = "5117pass"
var collection = "users_time" // <-- Replace this with your x500
MongoClient.connect(mongoURI + db_name, function(err, db){
  if (err) {
    throw err;
  }
  else {
    db.authenticate(db_user, db_pswd, function(err, result) {
      if (err) {
        throw err;
      }
      else {
        // Everything that was in the file before goes here
        handleSocket(db);

      }
    })
  }
})





app = express();

app.use(express.static('public')) 

app.get('/', function(req, res){
    res.sendFile( __dirname + '/' + 'index.html' );
    })

var port = process.env.PORT || 3000; // For when we deploy to Heroku

var server = app.listen(port)
console.log("server up")
var io = require('socket.io').listen(server);

function handleSocket(db) {
	io.sockets.on('connection', function (socket) {
	    socket.on('getTime', function () {
			var systime= new Date().getTime();
			
			socket.emit('systime', systime);
	        console.log("Sent to client. Time:"+systime);


	        var data = { 'systime' : systime }
	    	db.collection(collection).insert(data, function(err, ids){}) // <--
	    	console.log("systime logged to database collection: " + collection);

	    })
	})
}
