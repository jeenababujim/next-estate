import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);
    
    if (initialized) {
        console.log('Mongodb is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'next-estate',
        });

        console.log('Connected to MongoDB');
        initialized = true;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
