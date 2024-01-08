const express = require('express');
const burgerRoutes = require('./routes/burgerRoutes');
const favicon = require('serve-favicon')
const path = require('path')
const methodOverride = require('method-override')
require("dotenv").config();

// express app
const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// connect to mongo db
const connectDB = require("./connectDB");
connectDB();

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
// app.use((req, res, next) => {
//     res.locals.path = req.path;
//     next();
// });

// routes
app.get('/', (req, res) => {
    res.redirect('/burgers');
});

app.get('/about', (req, res) => {
    res.render('aboutUs', { title: 'About' });
});

// blog routes
app.use('/burgers', burgerRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});