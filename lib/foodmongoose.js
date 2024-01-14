import mongoose from 'mongoose';

const connectCityDB = async () => {
    try {
        
        mongoose.citicart =  await mongoose.createConnection(process.env.CITY_MONGO_URI)

        console.log("Citycart db connected");
    } catch (err) {
        console.error('Error while connecting to citycart MongoDB : ' + err.message)
    }
}

export default connectCityDB;