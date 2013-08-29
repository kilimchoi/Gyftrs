/*
 * GET likes
 */

exports.likes = function(req, res) {
    var data = req.user.data.data;
    var numbers = req.params;
    console.log(numbers);
    var music, movies, books, name, bday, pic_square;
    pic_square = data[numbers.id].pic_square;
    name = data[numbers.id].name;
    bday = data[numbers.id].birthday_date;
    music = data[numbers.id].music;
    movies = data[numbers.id].movies;
    books = data[numbers.id].books;
    console.log(music);
    console.log(movies);
    console.log(books);
    console.log(name);
    console.log(bday);
    console.log(pic_square);
    console.log("music is ", music.split(','));
    res.render('likes', {musics: music.split(','), movie: movies, book: books, full_name: name, profile_pic: pic_square, birthday: bday});
};
