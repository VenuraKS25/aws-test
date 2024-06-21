import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import corsMiddleware from './middleware/cors.middleware.js';

import { default as HelloRouter } from './routes/hello-world.route.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(corsMiddleware);

app.use(HelloRouter);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('triggerAlert', () => {
        io.emit('showAlert');
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})