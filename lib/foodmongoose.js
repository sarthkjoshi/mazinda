import mongoose from 'mongoose';

// const connectCityDB = async () => {
//     try {
        
//         mongoose.citicart =  await mongoose.createConnection(process.env.CITY_MONGO_URI)

//         console.log("Citycart db connected");
//     } catch (err) {
//         console.error('Error while connecting to citycart MongoDB : ' + err.message)
//     }
// }

// export default connectCityDB;


// const mongoose = require("mongoose");

module.exports = (options = {}) => {
    // Connect to MongoDB
    console.log("2nd mongo")
    const db = mongoose.createConnection(process.env.CITY_MONGO_URI, { maxPoolSize: 10 });
    
    // By default, Mongoose skips properties not defined in the schema (strictQuery). Adjust it based on your configuration.
    db.set('strictQuery', true);
    
    // Event handling
    db.once('open', () => console.info("MongoDB secondary connection opened!"));
    // db.on('connected', () => console.info(`MongoDB secondary connection succeeded!`));
    // db.on('error', (err) => {
    //     console.error(`MongoDB secondary connection failed, ` + err);
    //     db.close();
    // });
    // db.on('disconnected', () => console.info(`MongoDB secondary connection disconnected!`));

    // Graceful exit
    // process.on('SIGINT', () => {
    //     db.close().then(() => {
    //         console.info(`Mongoose secondary connection disconnected through app termination!`);
    //         process.exit(0);
    //     });
    // });

    // Export db object
    return db;
}
