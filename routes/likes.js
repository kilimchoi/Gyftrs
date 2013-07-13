/*
 * GET likes
 */

exports.likes = function(req, res) {
    var data = req.user.data.data;
    var numbers = req.params;
    console.log(numbers);
    var music, movies, books;
    music = data[numbers.id].music;
    movies = data[numbers.id].movies;
    books = data[numbers.id].books;
    console.log(music);
    console.log(movies);
    console.log(books);
    res.render('likes', {musics: music.split(','), movie: movies, book: books});
};
