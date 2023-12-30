const express = require('express');
const mongoose = require('mongoose');
const Burger = require('./models/burger')

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

// routes
app.get('/all-burgers', (req, res) => {
    Burger.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/burgers', (req, res) => {
    const newBurger = new Burger(req.body)
    newBurger.save()
        .then((result) => {
            res.redirect('/burgers')
        })
        .catch((err) => {
            console.log(err);
        })
});


// basic routes
app.get('/', (req, res) => {
    res.redirect('/burgers')
});

app.get('/about', (req, res) => {
    res.render('aboutUs', { title: 'About' });
});

// burger routes
app.get('/burgers', (req, res) => {
    Burger.find()
        .then((result) => {
            res.render('main', { title: 'Home', burgers: result });
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/create', (req, res) => {
    res.render('createBurger', { title: 'New burger' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});