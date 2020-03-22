import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//create schema
let Orders = new Schema({
    ticketId: {
        type: Number,
        required: true,
        unique: true
    },
    productId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    netPrice: {
        type: Number,
        required: true
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
    collection: 'orders'
});


// Export the model
module.exports = mongoose.model('Orders', Orders);