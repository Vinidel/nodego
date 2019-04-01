import http from 'http';
import mongoose from 'mongoose';
import app from './app';

const port: string = process.env.PORT || '8081';
const connectionSting: string = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionSting)
  .then(() => {
    console.log('DB connected Successfully');
    const server = http.createServer(app);
    return server.listen(port, () => {
      console.log(`Server running in port ${port}`);
    });
  })
  .catch((err: Error) => console.log('Not connected to DB', err));

