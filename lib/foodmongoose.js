// import mongoose from 'mongoose';

// const connectCityDB = async () => {
//     try {

//         // Close the existing connection if there is one
//         if (mongoose.connection.readyState !== 0) {
//             await mongoose.connection.close();
//         }

//         await mongoose.connect(process.env.CITY_MONGO_URI)
//         console.log("Citycart db connected");
//     } catch (err) {
//         console.error('Error while connecting to citycart MongoDB : ' + err.message)
//     }
// }

// export default connectCityDB;