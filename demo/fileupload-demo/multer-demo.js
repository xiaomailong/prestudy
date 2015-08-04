
// Multer是node的一个中间件，通过multipart/form-data类型提交，
// 如果在顶部写入busboy模块（可以快速解析来自html的数据）可以加快效率。
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})


// 也可以通过：
var upload = multer({dest:"uploads/"}).single('avatar');

app.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
        console.log(req.body);   //打印请求体
        console.log(req.file);
      // An error occurred when uploading
      return
    }

    // Everything went fine
  })
})
