module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const category = require('../../models/Category')

    router.post('/categories', async(req, res) => {
        const data = await category.create(req.body)
        res.send(data);
    })

    app.use('/admin/api', router);
}