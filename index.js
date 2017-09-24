const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var configdb = require('./config/configdb');

app.use(express.static(__dirname + '/public'));

mongoose.connect(configdb.url);

var User = require('./app/models/user');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var Article = require('./app/controller/statusController');
var mainfunction = require('./app/controller/mainfunctions');
app.route('/api/new')
    .get(function (req, res) {
        var skip = req.query.page;
        if (skip === '') {
            skip = 0
        }
        skip = parseInt(skip) * 10;
        Article.DanhSachBaiViet(skip, 'Publish', function (err, data) {
            res.json(data);
        });
    });

app.route('/api/cate/:slug')
    .get(function (req, res) {
        let skip = req.query.page;
        if (skip === '') {
            skip = 0
        }
        skip = parseInt(skip) * 10;
        let param = req.params.slug;

        Article.DanhSachBaiVietCate(skip, param, function (err, data) {
            res.json(data);
        });
    });

app.route('/api/userpost/:slug')
    .get(function (req, res) {
        let skip = req.query.page;
        if (skip === '') {
            skip = 0
        }
        skip = parseInt(skip) * 10;
        let param = req.params.slug;
        Article.DanhSachBaiVietUser(skip, param, function (err, data) {
            res.json(data);
        });
    });

app.route('/api/detail/:id')
    .get(function (req, res) {
        var id = req.params.id;
        Article.ChiTietBaiViet(id, function (err, data) {
            res.json(data);
        });
    });

app.route('/api/article-hot')
    .get(function (req, res) {
        let id_article = req.body.id_article;
        Article.AticleHot(function (err, data) {
            res.json(data);
        });
    });

app.route('/api/comments')
    .post(function (req, res) {
        let data = req.body;
        Article.AticleComment(data, function (err, data) {
            res.json(data);
        });
    });

app.route('/api/likes')
    .post(function (req, res) {
        let data = req.body;
        Article.AticleLikes(data, function (err, data) {
            res.send(data);
        });
    });

app.route('/api/auth/login')
    .post(function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({'local.email': email}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send('');
            } else if (!user.validPassword(password)) {
                res.send('');
            } else {
                const userInfo = {
                    email: user.local.email,
                    password: user.local.password,
                    id: user._id,
                    name: user.local.name,
                    image: user.local.image,
                    userSlug: user.local.userSlug
                };
                var token = mainfunction.generateToken(userInfo);
                res.status(200).json({
                    token: token,
                    user: userInfo
                });
            }
        });
    });

app.route('/api/auth/register').post(function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.firstName;
    let userSlug = req.body.lastName;
    User.findOne({$or : [{'local.email': email},{'local.userSlug': userSlug}]}, function (err, user) {
        if (err) throw err;

        if (user) {
            res.send('duplicate');
        } else {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let checkemail = re.test(email);
            if (checkemail && userSlug !== ''){
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.name = name;
                newUser.local.userSlug = userSlug;
                newUser.local.image = '';
                newUser.local.id_social = '';
                newUser.save(function (err) {
                    if (err) throw err;
                    res.send('success');
                });
            } else {
                res.send('fail');
            }
        }
    });
});

app.route('/api/get-top-user-week').get(function (req, res) {
    Article.getTopUser('week',function (err, data) {
        res.json(data);
    });
});

app.route('/api/get-top-user-month').get(function (req, res) {
    Article.getTopUser('month',function (err, data) {
        res.json(data);
    });
});

app.route('/api/get-top-user-total').get(function (req, res) {
    Article.getTopUser('total',function (err, data) {
        res.json(data);
    });
});

app.route('/api/upload').post(function (req, res) {
    let data = req.body;
    Article.postUploadBaiViet(data,function (err, data) {
        res.json(data);
    });
});

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port);
console.log("server started on port " + port);
