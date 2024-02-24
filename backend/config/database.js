const mongoose = require("mongoose");

const connectToDB = () => {
    const connectionString = "mongodb://localhost:27017/Ecommerce";

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`MongoDB connected with host: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`Error connecting to MongoDB: ${err}`);
        });
};

module.exports = connectToDB;
