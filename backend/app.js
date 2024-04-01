const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const http=require('http')

const {Server}=require('socket.io')

const server=http.createServer(app);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}
));
app.use(cookieparser());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

io.on('connection',(socket)=>{
    console.log(`user is connected with id: ${socket.id}`)

    socket.on('join-room',(room)=>{
        socket.join(room);
        console.log("user is join :"+room)


        // socket.on('start-vedio',({cloudinarylink})=>{
        //     socket.to(room).emit("starting-vedio",cloudinarylink)
        // })
        socket.on('play-movie',({mylink:cloudinarylink,room})=>{
            console.log("this is a cloudinary link"+cloudinarylink+room)
            io.to(room).emit('start-vedio',{cloudinarylink});
            // socket.to(room).emit('start-vedio',{cloudinarylink});
        })
    })
    socket.on('message',({message,room,sender})=>{
       io.to(room).emit("receive-message",{text:message,sender})
        // socket.to(room).emit("receive-message",message)
    })

    socket.on("disconnect",()=>{
        console.log(`user is disconnected with id : ${socket.id}`)
    })
})



app.use('/temporary', express.static("/temporary"));
const user = require("./routes/userRouter.js");
const movie=require('./routes/movieRouter.js')

app.use("/api/user", user);
app.use("/api/movie",movie);

module.exports = {app,io,server};
