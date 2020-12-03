const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // For debug console
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const connectDB = require('./config/db');
var helmet = require('helmet')
var https = require('https')


//Load config
dotenv.config({path: './config/config.env'});

//Passport config
require('./config/passport')(passport);

connectDB();

const app = express();

//Helmet
app.use(helmet())

//Body parsing
app.use(express.urlencoded({extended: false}));
app.use(express.json())

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')); // Lets code recompile when changed when in dev mode
}
//Sessions
app.use(cors({
    origin: [process.env.BASEURL],
    credentials: true,
}));
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    secure: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/code', require('./routes/codeBlock'));

const PORT = process.env.PORT || 3000;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/octorun.tylercchase.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/octorun.tylercchase.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/octorun.tylercchase.com/chain.pem', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
https.createServer(credentials, app).listen(PORT, ()=> {
    console.log(`Running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
});