var Article = require('../../app/models/article.js');
var User = require('../../app/models/user.js');

function DanhSachBaiViet(skip, status, callback) {
    Article.find({status: status}).sort({date: -1}).skip(skip).limit(10).exec(function (err, data) {
        callback(err, data);
    });
}

function DanhSachBaiVietCate(skip, cate, callback) {
    if (cate === 'hot') {
        Article.find({status: "Publish"}).sort({views: -1}).skip(skip).limit(10).exec(function (err, data) {
            callback(err, data);
        });
    } else {
        Article.find({$and: [{status: "Publish"}, {userSlug: cate}]}).sort({date: -1}).skip(skip).limit(10).exec(function (err, data) {
            callback(err, data);
        });
    }
}

function DanhSachBaiVietUser(skip, user, callback) {
    if (user === 'unknown') {
        Article.find({$and: [{status: "Publish"}, {userSlug: {$exists: false}}]}).sort({date: -1}).skip(skip).limit(10).exec(function (err, data) {
            callback(err, data);
        });
    } else {
        Article.find({$and: [{status: "Publish"}, {userSlug: user}]}).sort({date: -1}).skip(skip).limit(10).exec(function (err, data) {
            callback(err, data);
        });
    }
}

function CountDanhSachChoDuyet(status, callback) {
    Article.count({status: status}, function (err, count) {
        callback(null, count);
    });
}

function ChiTietBaiViet(id, callback) {
    Article.findOne({"_id": id}).exec(function (err, data) {
        var old_view = data.views;
        if (typeof old_view == 'undefined') {
            old_view = 0;
        }
        data.views = parseInt(old_view) + 1;
        let id_user = data.userSlug !== 'undefined' ? data.userSlug : '';
        if (id_user !== '' && typeof id_user !== "undefined" && data.userSlug != 'unknown') {
            User.findOne({"local.userSlug": id_user}).exec(function (err, result) {
                let week = typeof result.meta.viewWeek === 'undefined' ? 0 : result.meta.viewWeek;
                let month = typeof result.meta.viewMonth === 'undefined' ? 0 : result.meta.viewMonth;
                let total = typeof result.meta.viewTotal === 'undefined' ? 0 : result.meta.viewTotal;

                process.env.TZ = 'Asia/Ho_Chi_Minh';
                if(typeof  result.meta.monday === 'undefined' && typeof  result.meta.sunday === 'undefined'){
                    var current = new Date();
                    current.setHours(0,0,0,0);
                    var weekstart = current.getDate() - current.getDay() +1;
                    var weekend = weekstart + 6;
                    var monday =  new Date(current.setDate(weekstart));
                    var sunday = new Date(current.setDate(weekend));

                    var firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
                    var lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);
                    result.meta.monday = monday;
                    result.meta.sunday = sunday;
                    result.meta.firstDay = firstDay;
                    result.meta.lastDay = lastDay;

                    result.meta.viewWeek = parseInt(week) + 1;
                    result.meta.viewMonth = parseInt(month) + 1;
                    result.meta.viewTotal = parseInt(total) + 1;
                }else {
                    let date = new Date();
                    var current = new Date();
                    current.setHours(0,0,0,0);
                    if(date > result.meta.monday &&  date < result.meta.sunday){
                        result.meta.viewWeek = parseInt(week) + 1;
                    }else {
                        var weekstart = current.getDate() - current.getDay() +1;
                        var weekend = weekstart + 6;
                        var monday =  new Date(current.setDate(weekstart));
                        var sunday = new Date(current.setDate(weekend));
                        result.meta.monday = monday;
                        result.meta.sunday = sunday;
                    }

                    if(date > result.meta.firstDay &&  date < result.meta.lastDay){
                        result.meta.viewMonth = parseInt(month) + 1;
                    }else {
                        var firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
                        var lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);
                        result.meta.firstDay = firstDay;
                        result.meta.lastDay = lastDay;
                    }
                    result.meta.viewTotal = parseInt(total) + 1;
                }

                result.save();
                data.save(function (err) {
                    callback(err, data);
                });
            });
        } else {
            data.save(function (err) {
                callback(err, data);
            });
        }
    });
}

function AticleHot(callback) {
    Article.find({status: "Publish"}).sort({views: -1}).skip(0).limit(10).exec(function (err, data) {
        callback(err, data);
    });
}

function AticleComment(data, callback) {
    Article.findOne({_id: data.id_article}).exec(function (err, data1) {
        var old_comment = data1.comments;
        if (typeof old_comment == 'undefined') {
            old_comment = [];
        }
        if(data.replyID === ''){
        let comment = {
            id: data.id,
            name: data.name,
            image: data.image,
            like: 0,
            content: data.content,
            date: data.date,
            reply: [],
        }
        old_comment.push(comment);
      }else {
        let rep = {
            id: data.id,
            name: data.name,
            image: data.image,
            like: 0,
            content: data.content,
            date: data.date,
        }
      let cmt = old_comment.filter((obj)=>{
        return obj._id.toString() === data.replyID.toString()
      });
      cmt[0].reply.push(rep);
      }
        data1.comments = old_comment;
        data1.save(function (err) {
            callback(err, data1.comments);
        });
    });
}

function AticleLikes(data, callback) {
    Article.findOne({_id: data.id_article}).exec(function (err, data1) {

        let old_likes = data1.likes;
        if (typeof old_likes == 'undefined') {
            old_likes = [];
        }

        let old_dislikes = data1.dislikes;
        if (typeof old_dislikes == 'undefined') {
            old_dislikes = [];
        }

        var id = data.id;
        if (data.action === 'like') {
            if (old_likes.indexOf(data.id) === -1) {
                old_likes.push(data.id);
            } else {
                old_likes = old_likes.filter((val, i) => {
                    return (val !== id)
                });
            }
            old_dislikes = old_dislikes.filter((val, i) => {
                return (val !== id)
            });
        } else if (data.action === 'dislike') {

            old_likes = old_likes.filter((val, i) => {
                return (val !== id)
            });

            if (old_dislikes.indexOf(data.id) === -1) {
                old_dislikes.push(data.id);
            } else {
                old_dislikes = old_dislikes.filter((val, i) => {
                    return (val !== id)
                });
            }
        }

        data1.likes = old_likes;
        data1.dislikes = old_dislikes;

        data1.save(function (err, res) {
            callback(err, 'success');
        });
    });
}

function getTopUser(time, callback) {
    User.find({}).sort({"meta.viewWeek": -1}).skip(0).limit(10).exec(function (err, data) {
        callback(err, data);
    });
}

function getTopUserMonth(time, callback) {
    User.find({}).sort({"meta.viewMonth": -1}).skip(0).limit(10).exec(function (err, data) {
        callback(err, data);
    });
}

function getTopUserTotal(time, callback) {
    User.find({}).sort({"meta.viewTotal": -1}).skip(0).limit(10).exec(function (err, data) {
        callback(err, data);
    });
}

function postUploadBaiViet(data, callback) {
  try {
    var article = new Article;
    article.user.id = data.id;
    article.user.name = data.name;
    article.user.image = data.image;
    article.userSlug = data.userSlug;
    article.title = data.title;
    if (data.link.indexOf('www.youtube.com') !== -1) {
        let code = data.link.split('?v=');
        article.image = 'http://i.ytimg.com/vi/' + code[1] + '/0.jpg';
        article.linkVideo = code[1];
    } else {
        article.image = data.link;
        article.linkVideo = '';
    }
    article.status = 'Publish';
    article.views = 0;
    article.likes = [];
    article.shares = [];
    article.dislikes = [];
    article.comments = [];
    article.save(function (err) {
        callback(err, data);
    });
  } catch (e) {
        callback(null, null);
  } finally {

  }
}

module.exports.DanhSachBaiViet = DanhSachBaiViet;
module.exports.CountDanhSachChoDuyet = CountDanhSachChoDuyet;
module.exports.ChiTietBaiViet = ChiTietBaiViet;
module.exports.AticleHot = AticleHot;
module.exports.AticleComment = AticleComment;
module.exports.AticleLikes = AticleLikes;
module.exports.DanhSachBaiVietCate = DanhSachBaiVietCate;
module.exports.DanhSachBaiVietUser = DanhSachBaiVietUser;
module.exports.getTopUser = getTopUser;
module.exports.getTopUserMonth = getTopUserMonth;
module.exports.getTopUserTotal = getTopUserTotal;
module.exports.postUploadBaiViet = postUploadBaiViet;
