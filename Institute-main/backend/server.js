import express, { json } from 'express';
import { connect } from "./connect.js"
import cors from 'cors';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from "http"
import { buyone } from './route.js';
import { Course } from './schema.js';

//config environment variables
config();

//create express app0
const app = express();

//use middleware
app.use(json());
app.use(cors());



//we cannot directly put express server with Server so we need to create a httpServer
//create httpserver instance
const httpServer = createServer(app);

// Pass the server instance to SocketIO constructor
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//connect to MongoDB Atlas
connect();

//Routes or we can listen inside io.on with socket.on("buy") for buy event
// app.put("/buy/:id", (req, res) => { buyone(req, res, io); });

//listen for new connections
io.on('connection', (socket) => {
  console.log(`New client connected ${socket.id}`);

  //send initial data to client
  Course.findOne({ name: 'java' })
    .then((course) => {
      socket.emit('data', course);
    })
    .catch((err) => console.error(err));

  //listening for update event - if yes then update buyers field by one
  socket.on('buy', (id) => {
    Course.findByIdAndUpdate({ _id: id }, { $inc: { buyers: 1 } }, { new: true }).then((course) => {
      io.emit("data", course);
    }).catch((err) => console.log(err))
  })

  //listen for disconnect event
  socket.on('disconnect', () => {
    console.log(`client disconnected ${socket.id}`);
  });
});

//start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));



