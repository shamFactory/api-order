import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//create schema
let Stock = new Schema({
    codart: {
        type: Number,
        required: true,
        unique: true
    },
    descrip: {
        type: String
    },
    resto: {
        type: Number,
    },
    peso: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
    collection: 'stock'
});


// Export the model
module.exports = mongoose.model('Stock', Stock);