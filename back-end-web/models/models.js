const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect(`mongodb+srv://uwise:WWxx971173117@uwise.vsv8lb2.mongodb.net/UWise`);
}

module.exports = connect;