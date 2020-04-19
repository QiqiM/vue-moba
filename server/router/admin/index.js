module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    router.post('/', async(req, res) => {
        const data = await req.Model.create(req.body)
        res.send(data);
    })

    router.put('/:id', async(req, res) => {
        const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(data);
    })

    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({ success: true });
    })

    router.get('/', async(req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }

        const data = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(data);
    })

    router.get('/:id', async(req, res) => {
        const data = await req.Model.findById(req.params.id)
        res.send(data);
    })

    app.use('/admin/api/rest/:resource', async(req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router);

    // 上传图片
    const upload = require('../../plugins/upload')

    app.use('/admin/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async(req, res) => {
        const { username, password } = req.body

        // 根据用户名，查找用户
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({ username }).select('+password')

        if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }


        // 判断是否为合法用户
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            return res.status(422).send({
                message: '密码错误'
            })
        }

        const jwt = require('jsonwebtoken')
        const token = jwt.sign({ id: user._id }, app.get('secret'))

        res.send({ token })
    })
}