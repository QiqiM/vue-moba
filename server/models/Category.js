const mongoose = require('mongoose');

const cateSchema = new mongoose.Schema({
    name: { type: String }
});

module.exports = mongoose.model('Category', cateSchema)