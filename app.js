const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const manufacturerRouter = require('./routes/manufactures-fs');
const carRouter = require('./routes/cars-fs');
const manufacturerRouterDb = require('./routes/manufactures-db');
const carRouterDb = require('./routes/cars-db');

// Logg in file
const { loggingMiddleware }  = require('./public/helpers/logging-middleware');

//authentication
const passport = require('passport');
const { passportStrategyInit } = require('./public/helpers/basic-strategy');

const app = express();
//swagger docu
const swagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is our CarAPI documentation',
            title: 'CarAPI',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json",
            "text/html"
        ],
        schemes: ['http']
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
swagger(options)

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(loggingMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manufacturer-fs', manufacturerRouter);
app.use('/car-fs', carRouter);
app.use('/manufacturer', manufacturerRouterDb);
app.use('/car', carRouterDb);

module.exports = app;
