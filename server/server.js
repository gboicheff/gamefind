require("dotenv").config()

const connectDb = require('./models').connectDb
const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const path = require('path')
const axios = require('axios')
var passport = require('passport');
var session = require('express-session');
var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;


const port = process.env.PORT || 5000;
const app = express()

app.use(cors())
app.use(bodyParser.json())



const steam = require('./api/Steam.js')





passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Initiate Strategy
let returnURL = process.env.NODE_ENV === 'production' ? "http://www.gamefind.io/steam/return" : "http://localhost:3000/steam/return"
let realm = process.env.NODE_ENV === 'production' ? "http://www.gamefind.io" : "http://localhost:3000"





app.use('/api/steam', steam)


passport.use(new SteamStrategy({
    returnURL: returnURL,
    realm: realm,
    apiKey: process.env.STEAM_API_KEY
    }, function (identifier, profile, done) {
        process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
        });
    }
));

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
     maxAge: 3600000
    }
   }))

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send(req.user);
});
app.get('/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/')
});

app.get(
    "/steam/return",
    function(req, res, next) {
      req.url = req.originalUrl;
      next();
    },
    passport.authenticate("steam", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/");
    }
  );

app.get('/steam/account', (req, res) => {
    res.json([{ user: req.user }]);
});

app.get("/steam/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

app.get('/steam/games', async(req, res) => {
    console.log(req.user)
    let url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + process.env.STEAM_API_KEY + '&steamid=' + req.user.id + '&format=json'
    response = await axios.get(url)
    console.log(response)
    res.json({id: req.user.id, games: response.data.response.games})
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

connectDb().then(async () => {
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`),
    );
});
