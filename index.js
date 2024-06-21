import express from 'express';
import dotenv from 'dotenv';

import corsMiddleware from './middleware/cors.middleware.js';

import {default as HelloRouter}  from './routes/hello-world.route.js';

dotenv.config();

const app = express();
app.use(corsMiddleware);

app.use(HelloRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})