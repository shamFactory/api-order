import express from 'express';
import httpi from 'http';
import globalConfig from './config/globalConfig';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const http = httpi.Server(app);


mongoose.Promise = global.Promise;
mongoose.connect(globalConfig.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Hello from Node.js app \n");
});

const PORT = globalConfig.port || 4000;
http.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});