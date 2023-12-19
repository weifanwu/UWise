const mongoose = require('mongoose');

const staticResourcesSchema = new mongoose.Schema({
    title: String,
    intro: String,
    type: String,
    img: String,
    url: String,
    create_date: Date,
});

const StaticResources = mongoose.model('StaticResources', staticResourcesSchema);

module.exports = StaticResources;