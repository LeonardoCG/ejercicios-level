
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DataSchema = Schema({
    name: String,
    email: String,
    kilometros: { type: Number, default: 0 }
});

module.exports = mongoose.model('dato', DataSchema);