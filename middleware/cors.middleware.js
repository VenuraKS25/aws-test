import cors from 'cors';

const corsOptions = {
    origin: "*", // Adjust as needed for your security requirements
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

export default cors(corsOptions);
