import express from 'express';

const router = express.Router();

router.get("/api/home", (req, res) => {
    res.send({message : "Hello World!"});
});

export default router;