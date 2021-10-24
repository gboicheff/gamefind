const mongoose = require("mongoose");

const Category = new mongoose.Schema({
    name :{ type: String, required: true},
    id :{ type: Number, required: true, unique:true},
});
module.exports = mongoose.model('categories', Category);