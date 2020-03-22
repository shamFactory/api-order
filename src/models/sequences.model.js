import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//create schema
let Sequences = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    seq: {
        type: Number,
        required: true
    }
}, {
    collection: 'sequences'
});


// Export the model
module.exports = mongoose.model('Sequences', Sequences);