const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const Store = require('connect-mongodb-session')(session);

const router = require('./routes/router');

const app = express();
const MONGO_URI = 'mongodb+srv://parth:P%40rth2005@cluster0.eixcpta.mongodb.net/user?retryWrites=true&w=majority'

const store = new Store({
    uri: MONGO_URI,
    collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', 'views');
    
app.use(express.static('Async Request'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: store
}))
app.use(router);

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
    .then(
        result => {
            app.listen(3434);
        }
    )
    .catch(err => console.log(err));