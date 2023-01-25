var app = require('express')();
var http = require('http').Server(app);
const io=require('socket.io')(http);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
       
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',{name:users[socket.id]})
    });
})

http.listen(3500, function(){
    console.log('listening on *:3500');
 });