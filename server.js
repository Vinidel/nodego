const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;

mongoose
  .connect(`mongodb://node-shop-api:${process.env.MONGO_KEY}@node-shop-cluster-shard-00-00-9weg9.mongodb.net:27017,node-shop-cluster-shard-00-01-9weg9.mongodb.net:27017,node-shop-cluster-shard-00-02-9weg9.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-cluster-shard-0&authSource=admin&retryWrites=true`)
  // .connect(`mongodb://localhost/node-shop`)
  .then(() => {
    console.log('DB connected Successfully');
    const server = http.createServer(app);
    return server.listen(port, () => {
      console.log(`Server running in port ${port}`);
    });
  })
  .catch(err => console.log('Not connected to DB', err));

