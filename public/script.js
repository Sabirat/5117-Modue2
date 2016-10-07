var socket = io.connect();

function requestTime() {
    socket.emit('getTime', {"message": ""});
	console.log("hello");
}

function addTime(message) {
    $("#timeEntries").append('<div class="time_class"><p>' + message + '</p></div>');
}

$(function() {
    $("#getTime").click(function() {requestTime()});
})

socket.on('message', function(data) {
    console.log(data);
	addTime(data);
	
})