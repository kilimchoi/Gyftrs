exports.friend = function(req, res) {
    var data = req.user.data.data;
    console.log(data.length);
    console.log(data[0].name);
    names = [];
    bdays = [];
    uids = [];
    for (var i = 0; i < data.length; i++) {
        names[i] = data[i].name;
        bdays[i] = data[i].birthday_date;
        uids[i] = data[i].uid;
    }
    console.log(names);
    console.log(bdays);
    console.log(uids);
    res.render('friends', {name: names, bday: bdays, uid: uids});
};
