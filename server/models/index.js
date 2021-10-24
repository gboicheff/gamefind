const Game = require('./Game')
const GameList = require('./GameList')
const Category = require('./Category')
const mongoose = require('mongoose')

const connectDb = () => {
    return mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );
};

const models = {Game, GameList, Category};

exports.connectDb = connectDb;
exports.models = models;