var socket = io.connect();
socket.on('systime', function(data) {
    console.log(data);
	addTime(data);
	
})

console.log("hello world");
console.log(socket);

function requestTime() {
    socket.emit('getTime', {"message": ""});
	console.log("time request sent");
}

function addTime(message) {
    $("#timeEntries").append('<div class="time_class"><p>' + message + '</p></div>');
}

$(function() {
    $("#getTime").click(function() {requestTime()});
})


