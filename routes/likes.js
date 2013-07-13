/*
 * GET likes
 */

exports.likes = function(req, res) {
    /**var data = req.user.data.data;
    var numbers = req.params;
    console.log(numbers);
    console.log(numbers.length);
    music = [];
    movies = [];
    books = [];
    for (var i = 0; i < numbers.length; i++) {
        music[numbers[i]] = data[numbers[i]].music;
        movies[numbers[i]] = data[numbers[i]].movies;
        books[numbers[i]] = data[numberrs[i]].books;
    }
    console.log(names);
    console.log(bdays);
    console.log(uids);**/
    res.render('likes');//, {name: names, bday: bdays, uid: uids});
};
