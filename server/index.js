var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server,{
    cors: {
      origin: '*',
    }
});//Arreglando restricción del CORS

//Middleware express vista estatica
app.use(express.static("client"));

app.get("/hola-mundo",function(req,res){
    res.status(200).send("Hola mundo desde una ruta");
});

var messages=[{
    id:1,
    text:"Bienvenido al chat privado de socket.io y nodejs de Sergio ....",
    nickname:"Bot - sergio"
}]

//Conetar con el socket
io.on("connection",function(socket){
    console.log("El equipo con IP: "+socket.handshake.address+" se ha conectado...");

    socket.emit("messages",messages);

    socket.on("add-message",function(data){
        messages.push(data);
    });

    io.sockets.emit("messages",messages);
});

//Server corriendo en el puerto
server.listen(6677,function(){
    console.log("Servidor Funcionando en http://localhost:6677");
});

