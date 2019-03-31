"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');
const userRoute = require('./routes/users');
const app = express_1.default();
//Data parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//CORS
app.use(cors_1.default());
//Logging
app.use(morgan_1.default('dev'));
app.get('/sup', (req, res) => {
    res.status(200).json({ message: 'Whats up' });
});
//Auth
app.use((req, res, next) => {
    //this must be used to handle all authentication for the api
    // console.log('Heyyyyy yeah');
    next();
});
//Routes
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);
//Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json({ error: {
            message: error.message
        }
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map