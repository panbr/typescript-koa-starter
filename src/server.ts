import app from './app';
import dbConnect from './db/database.connection';

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT:number = Number(process.env.PORT) || 3000;

dbConnect
  .then(() => {
    console.log('connect db success...');
    app.listen(PORT);
  })
  .catch(console.error);