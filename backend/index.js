import {createServer} from "http";
import express from 'express';
import {Server} from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }});



io.on('connection',(socket)=>{
    console.log("This is socket:",socket);
    console.log("Socket is active ");
    socket.on("notification",(payload)=>{
        console.log("Payload is :",payload);
        io.emit("notification",payload);
    })
})

server.listen(5000,()=>{
    console.log("Server is listening at 5000");
});