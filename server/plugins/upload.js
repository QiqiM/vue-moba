const multer = require('multer')

var storage = multer.diskStorage({
    // uploads文件夹需手动创建
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, fileFormat[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

//添加配置文件到muler对象。
const upload = multer({
    storage: storage
});

module.exports = upload