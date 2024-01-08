const Burger = require('../models/burger');

const burger_main = (req, res) => {
    Burger.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('main', { burgers: result, title: 'All burgers' });
        })
        .catch(err => {
            console.log(err);
        });
}

const burger_details = (req, res) => {
    const id = req.params.id;
    Burger.findById(id)
        .then(result => {
            res.render('burgerDetails', { burgers: result, title: 'Burger Details' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'Burger not found' });
        });
}

const burger_create_get = (req, res) => {
    res.render('createBurger', { title: 'Create a new burger' });
}

const burger_create_post = (req, res) => {
    const burger = new Burger(req.body);
    burger.save()
        .then(result => {
            res.redirect('/burgers');
        })
        .catch(err => {
            console.log(err);
        });
}

const burger_delete = (req, res) => {
    const id = req.params.id;
    Burger.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/burgers' });
        })
        .catch(err => {
            console.log(err);
        });
}

const burger_update_put = async (req, res) => {
    let burger
    try {
        burger = await Burger.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        await burger.save()
        res.redirect(`/burgers`)
    } catch {
        if (burger == null) {
            res.redirect('/')
        }
    }
}

module.exports = {
    burger_main,
    burger_details,
    burger_create_get,
    burger_create_post,
    burger_delete,
    burger_update_put
}