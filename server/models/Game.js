const mongoose = require("mongoose");

const Game = new mongoose.Schema({
    name :{ type: String, required: true},
    appId :{ type: Number, required: true, unique:true},
    categories :{ type: [Number], required: true},
    genres :{ type: [Number], required: true},
    thumbnailLink :{ type: String, required: true},
    lastUpdate: {type: Number, required: true},
});

module.exports = mongoose.model('games', Game);