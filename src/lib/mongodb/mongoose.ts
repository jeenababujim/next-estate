import mongoose from "mongoose";

export const connect = async (): Promise<boolean> => {
    mongoose.set("strictQuery", true);

    if (mongoose.connection.readyState >= 1) {
        console.log("MongoDB is already connected");
        return true;
    }

    if (!process.env.MONGODB_URI) {
        console.error("Error: MONGODB_URI is not defined in .env file");
        return false;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "next-estate",
        });
        console.log("MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return false;
    }
};
