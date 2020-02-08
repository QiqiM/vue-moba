const mongoose = require('mongoose');

const articelSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
});

module.exports = mongoose.model('Article', articelSchema)