import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = () => {
    console.log("MongoDB_URI:", process.env.MONGO_URI);  // Log the URI for debugging

    mongoose.connect(process.env.MONGO_URI, { dbName: 'IP_MINI' })
        .then(() => {
            console.log('Connected to database');
        })
        .catch(err => {
            console.error("Error connecting to the database:", err);
        });
};
