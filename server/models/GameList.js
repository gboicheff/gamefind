const mongoose = require("mongoose");

const GameList = new mongoose.Schema({
    key :{ type: String, required: true, unique:true },
    gameAppIds :{ type: [Number], required: true },
    userIDs: { type: [String], required: true },
    categories: { type: [Number], required: true },
    createdAt: { type: Number, required: true },
    createdBy: { type: String, required: true }
});
module.exports = mongoose.model('game_lists', GameList);