var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userCount=0; 
var $ipsConnected = [];
var Cookies = require('cookies')
var cookies;
app.get('/', function(req, res){ 
    
    cookies = new Cookies( req, res);

  res.sendFile(__dirname + '/index.html');
 

});

io.on('connection', function(socket){
   
    
       

    socket.on("user name",function(name){
        socket.username=name;
      
   
      
    }
    );


    
  function incuser (){
        userCount++;
        console.log(socket.username +"  connected");
      
}
    
  
  
    socket.on('disconnect', function() {
   

      io.emit("leave user",socket.username);

});
   
    
    socket.on('chat message', function(msg){
        
      io.emit('chat message',socket.username+":"+ msg);

    });


 





  });
  //-------------------------
   
http.listen(3000, function(){
  console.log('listening on *:3000');
});