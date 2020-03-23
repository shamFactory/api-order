import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//create schema
let Articles = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
    },
    codart: {
        type: Number,
        required: true,
        unique: true
    },
    uniart: {
        type: Number,
    },
    descrip: {
        type: String
    },
    valor: {
        type: Number,
        required: true
    },
    resto: {
        type: Number,
    },
    unipaq: {
        type: Number,
    },
    unidmin: {
        type: Number,
    },
    peso: {
        type: Number,
    },
    codprecan: {
        type: String
    },
    codpreres: {
        type: String
    },
    factor: {
        type: Number,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
    collection: 'articles'
});


// Export the model
module.exports = mongoose.model('Articles', Articles);