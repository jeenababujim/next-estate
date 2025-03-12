import mongoose from "mongoose";

export const connect = async () => {
    mongoose.set("strictQuery", true);

    if (mongoose.connection.readyState >= 1) {
        console.log(" MongoDB is already connected");
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error(" Error: MONGODB_URI is not defined in .env file");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "next-estate",
        });

        mongoose.connection.on("connected", () => console.log(" MongoDB connected successfully"));
       
    } catch (error) {
        console.error(" Error connecting to MongoDB:", error);
        mongoose.connection.on("error", (err) => console.error(" MongoDB connection error:", err));
        throw error;
    }
};
