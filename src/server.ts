import app from './app';
import dbConnect from './config/dbConnect';
import { config } from './config/config';

dbConnect
  .then(() => {
    console.log('connect db success...');
    app.listen(config.port);
  })
  .catch(console.error);