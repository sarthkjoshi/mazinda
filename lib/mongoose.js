// import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         mongoose.mazinda =  await mongoose.createConnection(process.env.MONGO_URI)
//         console.log('connected')
//     } catch (err) {
//         console.error('Error while connecting to MongoDB : ' + err.message)
//     }
// }

// export default connectDB;


const mongoose = require("mongoose");
const connectDB = (options = {}) => {
// module.exports = (uri, options = {}) => {
    // By default, Mongoose skips properties not defined in the schema (strictQuery). Adjust it based on your configuration.
    mongoose.set('strictQuery', true);

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, options)
        .then()
        .catch(err => console.error("MongoDB primary connection failed, " + err));

    // Event handling
    // mongoose.connection.once('open', () => console.info("MongoDB primary connection opened!"));
    // mongoose.connection.on('connected', () => console.info("MongoDB primary connection succeeded!"));
    // mongoose.connection.on('error', (err) => {
    //     console.error("MongoDB primary connection failed, " + err);
    //     mongoose.disconnect();
    // });
    // mongoose.connection.on('disconnected', () => console.info("MongoDB primary connection disconnected!"));
    process.setMaxListeners(15); 
    // Graceful exit
    // process.on('SIGINT', () => {
    //     mongoose.connection.close().then(() => {
    //         console.info("Mongoose primary connection disconnected through app termination!");
    //         process.exit(0);
    //     });
    // });
}

export default connectDB;