const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        // Add connection options, including write concern
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Add the following line for write concern configuration
            writeConcern: { w: 'majority', wtimeout: 0 },
        };

        await mongoose.connect(URI, options);

        console.log("Connect successfully to DB");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(0);
    }
};

module.exports = connectDb;
