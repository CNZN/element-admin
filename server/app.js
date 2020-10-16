const City = require('./model/city')
const Movie = require('./model/movie')
const Login = require('./model/login')
const express = require('express')

var bodyParser = require('body-parser')
const multer = require('multer')
const app = new express()

// 自定义路径存放和文件名
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + file.originalname)
  }
})
//创建multer对象
var upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));//配置虚拟访问路径
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post('/user/login', function (req, res) {
  // req.session.token='加密算法生成随机token'
  // const data={'code':20000,'data':{'roles':['editor'],'token':req.session.token,'introduction':'I am a super administrator','avatar':'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif','name':'Super Admin'}}
  const data = {
    code: 20000,
    data: {
      token: 'asasasasas',
      orangiseid: 'wwwwwwww',
      introduction: 'I am a super administrator',
      avatar: 'https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2020-09-22/7afe3efb3e8fb391539e4e821e9ece28.jpg',
      name: 'Super Admin'
    }
  }
  res.json(data)
})
app.get('/user/info', function (req, res) {
  const data = {
    code: 20000,
    data: {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  }
  res.json(data)
})
app.post('/user/logout', function (req, res) {
  res.json({ code: 20000, message: 'success' })
})
// 城市的接口
// 增
app.post('/city/create', (req, res) => {
  const name = req.body.name
  const index = req.body.index
  const city = new City({
    name, index
  })
  city.save().then(mon => {
    if (mon) {
      res.json({
        code: 20000,
        msg: '添加成功'
      })
    }
  })
})
// 删
app.delete("/delcity/:id", (req, res) => {
  const id = req.params.id
  City.findByIdAndDelete(id).then(mon => {
    if (mon) {
      res.json({
        code: 20000,
        msg: "删除成功"
      })
    }
  })
})
// 改
app.get('/theOne/:id', (req, res) => {
  var id = req.params.id
  City.findById(id).then(mon => {
    console.log(mon)
    res.json({
      code: 20000,
      info: mon
    })
  })
})
app.post('/theOneadd', (req, res) => {
  var id = req.body.id
  var name = req.body.name
  var index = req.body.index
  console.log(req.body)
  City.findByIdAndUpdate(id, {
    name, index
  }).then(mon => {
    if (mon) {
      res.json({
        code: 20000,
        list: '修改成功'
      })
    }
  })
})
// 查
app.get('/citys', async (req, res) => {
  var page = req.query.page || 1
  var pagesize = req.query.pagesize || 3
  var start = (Number(page) - 1) * Number(pagesize)
  var num = Number(pagesize)
  var total = await City.find()
  var result = await City.find().skip(start).limit(num)
  res.json({
    code: 20000,
    list: result,
    total: total.length,
    allCity:total
  })
})



// 电影的接口
// 增
//电影页面城市显示
app.get('/showMovieRegion', (req, res) => {
  City.find().then(mon => {
    res.json({
      code: 20000,
      list: mon
    });
  })
})
// 图片上传接口
app.post('/upload', upload.single('avatar'), function (req, res, next) {
  if (req.file) {
    res.json({
      code: 200,
      path: req.file.path
    })
  }
})
// 添加页面 添加数据
app.post('/doAddMovie', (req, res) => {
  // console.log(req.body)
  const movie = new Movie({
    name: req.body.name,
    desc: req.body.desc,
    star: req.body.star,
    score: req.body.score,
    img: req.body.img,
    p: req.body.region
  });
  movie.save().then(mon => {
    res.json({
      code: 20000,
      msg: "添加成功"
    })
  })
})
// 删
app.delete("/delmovie/:id", (req, res) => {
  const id = req.params.id
  Movie.findByIdAndDelete(id).then(mon => {
    if (mon) {
      res.json({
        code: 20000,
        msg: "删除成功"
      })
    }
  })
})
// 改
// 查
app.get('/getMovieInfo', async (req, res) => {
  var page = req.query.page || 1
  var pagesize = req.query.pagesize || 3
  var start = (Number(page) - 1) * Number(pagesize)
  var num = Number(pagesize)
  // console.log(page,pagesize)
  var total = await Movie.find().populate('p')
  var result = await Movie.find().skip(start).limit(num).populate('p')
  res.json({
    code: 20000,
    list: result,
    total: total.length,
    all: total
  })
})

//登录
app.post('/todologin', (req, res) => {
  var username = req.body.username
  var password = req.body.password
  // console.log(req.body)
  Login.find({ username, password }).then(mon => {
    // console.log(mon)
    if (mon.length > 0) {
      res.json({
        code: 20000,
        msg: "登陆成功"
      })
    } else{
      res.json({
        code:50008,
        msg:'用户名或者密码错误'
      })
    }
  })
})

app.listen(8888, '127.0.0.1')
