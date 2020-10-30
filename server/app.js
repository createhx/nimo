const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParse = require('body-parser');
// 解决跨域
app.use(cors({
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080']
}));

app.use(bodyParse.urlencoded({
    extended: false
}));
// 创建连接池
const pool = mysql.createPool({
    //MySQL数据库服务器的地址
    host: '127.0.0.1',
    //端口号
    port: 3306,
    //数据库用户的用户名
    user: 'root',
    //数据库用户的密码
    password: '',
    //数据库名称
    database: 'nimo',
    //最大连接数据
    connectionLimit: 10
});

app.get('/cube', (req, res) => {
    // 查询语句
    let sql = "SELECT cname,c_url,cintro FROM city"
    //通过MySQL连接池执行SQL语句
    pool.query(sql, (err, results) => {
        if (err) throw err;
        res.send({ message: '查询成功', code: 1, results: results });
    });
})

//城市标签页对应下的城市房间信息
app.get('/recommend', (req, res) => {
    let house_id = req.query.house_id;

    let sql = "SELECT house_id,pic,title,subtitle,price,oldPrices,evaluate FROM house_laptop WHERE house_id=?"
    pool.query(sql, [house_id], (err, results) => {
        if (err) throw err
        res.send({
            message: '查询成功', code: 2, results: results
        })

    })
})

// 城市标签页接口
app.get('/citycount', (req, res) => {
    let sql = "select pid,pname,pnum from city_count"
    pool.query(sql, (err, results) => {
        if (err) throw err
        res.send({
            message: '查询成功', code: 200, results: results
        })
    })
})

//用户登录接口
app.post('/login', (req, res) => {
    //接收用户以post方式提交的数据
    //获取用户输入的验证码和手机信息
    let upwd = req.body.code;
    let unamePhone = req.body.mobile;
    //现在要以输入的用户名和密码为条件进行查找
    let sql = 'SELECT upwd,unamePhone,fans_count,follow_count ,like_count,grade_count  FROM nimo_login WHERE upwd=? AND unamePhone=?';
    pool.query(sql, [upwd, unamePhone], (error, results) => {
        if (error) throw error;
        //如果找到，代表用户登录成功
        if (results.length != 0) {

            res.send({ message: '登录成功', code: 201, results: results[0] })
        } else {  //否则代表用户登录失败
            res.send({ message: '登录失败', code: 400 })
        }
    });
});

//搜索联想建议接口
app.get('/suggestion', (req, res) => {
    var msg = decodeURI(req.query.q);

    var attr = msg.split(" ")

    for (var i = 0; i < attr.length; i++) {
        attr[i] = "title like N'%" + attr[i] + "%'"
    }

    var content = attr.join(" and ")
    var sql = 'select title from house_laptop where ' + content

    pool.query(sql, (err, results) => {
        if (err) throw err;
        var obj = {}
        if (results.length > 0) {
            obj = { code: 200, results: results }
        } else {
            obj = { code: 201, results: '没有相关数据' }
        }
        res.writeHead(200)
        res.write(JSON.stringify(obj))
        res.end()
    })
})

// 获取搜索结果api
app.get('/searchresult', (req, res) => {
    var msg = decodeURI(req.query.q);
    var attr = msg.split(" ")
    for (var i = 0; i < attr.length; i++) {
        attr[i] = "title like N'%" + attr[i] + "%'"
    }
    var content = attr.join(" and ")
    var sql = 'select title from house_laptop where ' + content
    pool.query(sql, (err, results) => {
        if (err) throw err;
        var obj = {}
        if (results.length > 0) {
            obj = { code: 200, results: results }
        } else {
            obj = { code: 201, results: '没有相关数据' }
        }
        res.writeHead(200)
        res.write(JSON.stringify(obj))
        res.end()
    })
})

//托管
app.use(express.static("public"));
app.listen(3000, () => {
    console.log('server is running...');
});