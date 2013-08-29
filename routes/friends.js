exports.friend = function(req, res) {
    var data = req.user.data.data;
    console.log(data[0]);
    console.log(data.length);
    console.log(data[0].name);
    names = [];
    bdays = [];
    uids = [];
    pic_squares = [];
    var birthdate;
    for (var i = 0; i < data.length; i++) {
        pic_squares[i] = data[i].pic_square;
        names[i] = data[i].name;
        birthdate = data[i].birthday_date;
        console.log("birthdate is ", data[i].birthday_date);
        bdays[i] = data[i].birthday_date;
        uids[i] = data[i].uid;
    }
    console.log(names);
    console.log(bdays);
    for (var i = 0; i < bdays.length; i++) {
        var splitted = bdays[i].split("/");
        splitted[2] = ''; 
        console.log("split result is ", splitted);
        bdays[i] = splitted[0] + "/" + splitted[1];
    }
    console.log(uids);
    res.render('friends', {name: names, bday: bdays, uid: uids, pic_square: pic_squares});
};
