const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const burgerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const Burger = mongoose.model('Burger', burgerSchema)
module.exports = Burger;