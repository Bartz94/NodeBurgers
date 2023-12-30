const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    const burgers = [
        { name: 'Classic Burger', ingredients: ['beef', 'bbq sauce', 'onion', 'cheddar', 'lettuce', 'tomato'], price: 24 },
        { name: 'Chicken Burger', ingredients: ['chicken', 'bbq sauce', 'onion', 'cheddar', 'lettuce', 'cucumber'], price: 22 },
        { name: 'Spicy burger', ingredients: ['beef', 'spicy mayo sauce', 'onion', 'cheddar', 'lettuce', 'tomato'], price: 25 },
    ];
    res.render('main', { title: 'Home', burgers });
});

app.get('/about', (req, res) => {
    res.render('aboutUs', { title: 'About' });
});

app.get('/burgers/create', (req, res) => {
    res.render('createBurger', { title: 'New burger' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});