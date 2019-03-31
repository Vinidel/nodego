const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 8081;
const connectionSting = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionSting)
  .then(() => {
    console.log('DB connected Successfully');
    const server = http.createServer(app);
    return server.listen(port, () => {
      console.log(`Server running in port ${port}`);
    });
  })
  .catch(err => console.log('Not connected to DB', err));

