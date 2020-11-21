const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // For debug console
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const connectDB = require('./config/db');


//Load config
dotenv.config({path: './config/config.env'});

//Passport config
require('./config/passport')(passport);

connectDB();

const app = express();

//Body parser

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
//Sessions
app.use(cors({
    origin: ['http://localhost:41309'],
    credentials: true,
}));
app.use(session({
    secret: 'ASDFasdf',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/code', require('./routes/codeBlock'));

const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(PORT, ()=> {
    console.log(`Running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
});