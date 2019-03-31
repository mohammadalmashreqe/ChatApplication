var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userCount=0; 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
   userCount++;
    io.emit("user count",userCount);
    socket.on('chat message', function(msg){
        
      io.emit('chat message',socket.username+":"+ msg);

    });





    socket.on("user name",function(name){
        socket.username=name;
      
    }
    )


  });
  //-------------------------
    io.on('disconnect',function()
    {
        userCount--;
    io.emit("user count",userCount);
    });
http.listen(3000, function(){
  console.log('listening on *:3000');
});