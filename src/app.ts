import express, { Response, Request, NextFunction } from "express";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');
const userRoute = require('./routes/users');
const app = express();

//Data parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
app.use(cors());

//Logging
app.use(morgan('dev'));

app.get('/sup', (req: Request, res: Response) => {
  res.status(200).json({message: 'Whats up'});
});

//Auth
app.use((req: Request, res: Response, next: NextFunction) => {
  //this must be used to handle all authentication for the api
  // console.log('Heyyyyy yeah');
  next();
});

//Routes
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);

//Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error =  new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error: { status: number; message: String; }, req: Request, res: Response, next: NextFunction) => {
  res
  .status(error.status || 500)
  .json({error: {
      message: error.message
    }
  });
});

module.exports = app;
