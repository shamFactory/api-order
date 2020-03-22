import express from 'express';
import httpi from 'http';
import global from './config/global';
const app = express();
const http = httpi.Server(app);

app.get("/", (req, res) => {
    res.send("Hello from Node.js app \n");
});

const PORT = global.port || 4000;
http.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});