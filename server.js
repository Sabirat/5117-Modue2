var express = require('express');

app = express();

app.get('/', function(req, res){
    res.sendFile( __dirname + '/' + 'index.html' );
    })

var port = process.env.PORT || 3000; // For when we deploy to Heroku
app.listen(port)