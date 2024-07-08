import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import corsMiddleware from './middleware/cors.middleware.js';
import HelloRouter from './routes/hello-world.route.js';

dotenv.config();

const app = express();
const server = createServer(app);

// Configure CORS for both Express and Socket.IO
const io = new Server(server);

// Use middleware
app.use(corsMiddleware);
app.use(express.json()); // Add this if you plan to handle JSON payloads
app.use(HelloRouter);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('onHelpRequest', (data) => {
        io.emit('showHelpRequest', data);
    });

    socket.on('onOrderAccepted', (data) => {
        io.emit('showOrderAccepted', data);
    });

    socket.on('onOrderPrepared', (data) => {
        io.emit('showOrderPrepared', data);
    });

    socket.on('onOrderDelivered', (data) => {
        io.emit('showOrderDelivered', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Set the port from the environment variable or use a default
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
