function NiceTime(date) {
    var foo = new Date(date);
    var curr = new Date();
    let diff =  curr.getTime()-foo.getTime();
    if (diff <= 59 * 1000) {
        return Math.ceil(diff / 1000) + ' giây trước';
    } else if ((diff >= 60 * 1000) &&(diff < 3600 * 1000)) {
        return  Math.ceil(diff / (60 * 1000)) + ' phút trước';
    }else if ((diff >= 3600 * 1000) &&(diff < 3600 * 24 * 1000))
    {
        return  Math.ceil(diff / (3600 * 1000)) + ' giờ trước';
    } else {
        return foo.toLocaleDateString();
    }
    }

module.exports.NiceTime = NiceTime;