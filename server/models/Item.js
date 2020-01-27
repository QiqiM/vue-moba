const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String }
});

module.exports = mongoose.model('Item', itemSchema)