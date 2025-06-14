const mongoose = require('mongoose');

const dbConnection = async (url) => {

    try {
        await mongoose.connect(url);
        console.info("Database Online");
    } catch (error) {
        console.error(error);
        throw new Error("Error connecting to database"); 
    }
    
}

module.exports = {
    dbConnection
}