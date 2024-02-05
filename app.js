require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const env = require('./config/environment');
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFido2 = require('./config/passport-fido2-webAuthn');
const customMware = require('./config/middleware');


const app = express();
require('./config/view-helpers')(app);
const port = process.env.PORT!=undefined? process.env.PORT : 8000;
const db = require('./config/mongoose');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.json());

app.use(express.static(env.asset_path));
console.log(`${env.asset_path}`);

app.use(express.static(path.join(process.cwd(), "/img")));

app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name : 'webScan',
    secret : env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

    store : MongoStore.create({

            mongoUrl: `${env.mongo_url}`,
            // mongoUrl : `mongodb://127.0.0.1:27017/kavach_development`,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-Mongodb store ok');
            return;
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);


app.use('/', require('./routes'));

app.listen(port, async function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});