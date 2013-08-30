
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    friends = require('./routes/friends'),
    rec = require('./routes/recommend'),
    like = require('./routes/likes'),
    give = require('./routes/gifts'),
    search = require('./routes/manual_search'),
    recommendations = require('./routes/recommendations'),
    http = require('http'),
    path = require('path');

var app = express();

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var graph = require('fbgraph');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/friends', friends.friend);
app.get('/manual_search', rec.manual);
app.get('/likes/:id', like.likes);
app.get('/gifts', give.gifts);
app.get('/search', search.manual);
app.get('/recommendations', recommendations.gift_recommendations);
app.get('/auth/facebook', passport.authenticate('facebook', {scope:['friends_birthday', 'friends_likes', 'user_likes', 'user_birthday']}));
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/friends',
                                            failureRedirect: '/login' }));
app.get('/logout', function(req, res){
     req.logout();
     res.redirect('/');
});

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use(new FacebookStrategy({
        clientID: "683118408381112",
        clientSecret: "19703eaa693ac5e9aced65e8ed09e6e5",
        callbackURL: "https://gyftrs.herokuapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshtoken, profile, done) {
        console.log(profile.id);
        var user={ 
            user_id: profile.id, 
            facebook_key: accessToken,  
            name: profile.displayName,
        };
        graph.setAccessToken(user.facebook_key);
        var query = "SELECT uid, name, birthday_date, music, movies, books, pic_square FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=" + profile.id + ") AND birthday_date >= '08/28' AND music != '' AND movies != '' AND books != '' ORDER BY birthday_date ASC LIMIT 10";
        graph.fql(query, function(err, res) {
            user.data = res;
            console.log(user.name + " was found!");
            console.log(user.data);
            done(null, user);
        });
    }
));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
