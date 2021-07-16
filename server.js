// Dependencies
const express = require('express');
const logger = require('morgan');   // Morgan for console loggin requests 
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect & require routes
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

// Mongoose => mongo.db Attempt to use env first, if running on heroku it will find it and use it
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.listen(PORT, () => {
    console.log(`App running on port localhost://${PORT}`);
});