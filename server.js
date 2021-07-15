// Dependencies
const express = require('express');
const logger = require('morgan');   // Morgan for console loggin requests 
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect & require routes
require('./routes/api-routes')(app, path);
require('./routes/html-routes')(app, path);

// Mongoose => mongo.db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true
});
app.listen(PORT, () => {
    console.log(`App running on port localhost://${PORT}`);
});