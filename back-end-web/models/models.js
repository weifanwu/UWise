const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect(`mongodb+srv://uwise:universityofwashington@uwise.vsv8lb2.mongodb.net/UWise`);
}

module.exports = connect;