exports.friend = function(req, res) {
    res.render('friends', {friends: 'user.data'});
};
