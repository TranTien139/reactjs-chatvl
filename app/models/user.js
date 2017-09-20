
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        id_social    : String,
        name         : String,
        userSlug: String,
        birthday: String,
        job: String,
        gender:String,
        hometown:String,
        education: String,
        image        : String,
        password     : String,
    },
    meta:{viewWeek:Number, viewMonth:Number, viewTotal:Number,monday:Date, sunday:Date,firstDay:Date, lastDay: Date }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
