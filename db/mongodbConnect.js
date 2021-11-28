const mongoose = require('mongoose');

const dbconnect = async (DB_URL) => {
    try {
        await mongoose.connect(DB_URL);
        console.log('database connected successfully');
    } catch (error) {
        console.log(error);
    }
}


module.exports = dbconnect