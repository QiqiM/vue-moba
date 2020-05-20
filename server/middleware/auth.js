const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser");
const assert = require('http-assert')

module.exports = options => {
    return async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录1')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录2')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录3')
        await next()
    }
}