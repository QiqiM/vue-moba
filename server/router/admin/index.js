module.exports = (app) => {
    const express = require("express");
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../../models/AdminUser");
    const assert = require('http-assert')

    const router = express.Router({
        mergeParams: true,
    });

    // 创建资源
    router.post("/", async(req, res) => {
        const data = await req.Model.create(req.body);
        res.send(data);
    });

    // 更新资源
    router.put("/:id", async(req, res) => {
        const data = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(data);
    });

    // 删除资源
    router.delete("/:id", async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({ success: true });
    });

    // 资源列表
    router.get("/", async(req, res) => {
        const queryOptions = {};
        if (req.Model.modelName === "Category") {
            queryOptions.populate = "parent";
        }

        const data = await req.Model.find().setOptions(queryOptions).limit(100);
        res.send(data);
    });

    // 资源详情
    router.get("/:id", async(req, res) => {
        const data = await req.Model.findById(req.params.id);
        res.send(data);
    });

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware = require('../../middleware/resource')

    app.use("/admin/api/rest/:resource",
        authMiddleware(),
        resourceMiddleware(),
        router
    );

    // 上传图片
    const upload = require("../../plugins/upload");

    app.use("/admin/api/upload", authMiddleware(), upload.single("file"), async(req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });

    app.post("/admin/api/login", async(req, res) => {
        const { username, password } = req.body;

        // 根据用户名，查找用户
        const user = await AdminUser.findOne({ username }).select("+password");

        assert(user, 422, '用户不存在')

        // if (!user) {
        //     return res.status(422).send({
        //         message: "用户不存在",
        //     });
        // }

        // 判断是否为合法用户
        const isValid = require("bcrypt").compareSync(password, user.password);

        // express 5.0版本一下,assert会被process的unhandledRejection直接捕获，走不到express的错误处理函数
        // 若需要使用http-assert,需要 npm i express@next 安装^5.0.0-alpha.8 express5的测试版本
        assert(isValid, 422, '密码错误')

        // if (!isValid) {
        //     return res.status(422).send({
        //         message: "密码错误",
        //     });
        // }

        const token = jwt.sign({ id: user._id }, app.get("secret"));

        res.send({ token });
    });

    // 错误处理函数
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
};