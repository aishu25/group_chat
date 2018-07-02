var express = require("express");
var app = express();
var port = 8000;
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./public/static")));
app.set("views", path.join(__dirname, "./public/views"));
app.set('view engine', 'ejs');

app.get("/", function(request, response){
	response.render("index");
});

var server = app.listen(port,function(){
	console.log("Listening on port 8000 for the group_chat project")
});

var io = require("socket.io").listen(server);

io.on("connection",function(socket){
	console.log("Client/Server is connected and id is: ", socket.id);
	socket.on('chat_msg',function(msg){
		io.emit('chat_msg', msg);
	})
	socket.on("disconnect", function(){
			console.log("Socket " + socket.id + " has disconnected from our chatroom");
		})
});
