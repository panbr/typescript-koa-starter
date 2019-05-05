import app from './app';
import databaseConnection from './db/database.connection';

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT:number = Number(process.env.PORT) || 3000;

databaseConnection
  .then(() => {
    console.log('connect db success...');
    app.listen(PORT);
  })
  .catch(console.error);