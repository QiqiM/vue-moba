const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
});

module.exports = mongoose.model('AdminUser', adminUserSchema)