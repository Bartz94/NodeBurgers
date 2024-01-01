const express = require('express');
const mongoose = require('mongoose');
const burgerRoutes = require('./routes/burgerRoutes');

// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://user:test12345@nodeburgers.fqid5mt.mongodb.net/nodeburgers?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => { console.log(err) })

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

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
// app.use((req, res) => {
//     res.status(404).render('404', { title: '404' });
// });