import mongoose from 'mongoose';
import * as globalConfig from './global.config';

mongoose.Promise = global.Promise;
mongoose.connect(globalConfig.DB, {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
}).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useFindAndModify', false);