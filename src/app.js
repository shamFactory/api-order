import express from 'express';
import httpi from 'http';
const app = express();
const http = httpi.Server(app);

app.get("/", (req, res) => {
    res.send("Hello from Node.js app \n");
});

//const PORT = config.port || 4000;
const PORT = 8080;
http.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});