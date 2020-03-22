import express from 'express';
import httpi from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import globalConfig from './config/globalConfig';
import dbConfig from './config/dbConfig';
import { ok, fail } from './utils/reponse';
import indexRouter from './routes/index';

const app = express();
const http = httpi.Server(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', indexRouter);

app.use((req, res, next) => {
	if (req.url == '/')
		return ok(res)({})

  return fail(res)("'Route '"+req.url+"' Not found.", 404)
});

// 500 - Any server error
app.use((err, req, res, next) => {
  console.log(err)
  console.log(next)
  return fail(res)(err, 500)
});

const PORT = globalConfig.port || 4000;
http.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});