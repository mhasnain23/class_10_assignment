import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

const connectToDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "books",
            maxPoolSize: 10,
            minPoolSize: 5,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
            retryWrites: true,
            w: 'majority'
        });

        cachedConnection = conn;
        return conn;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectToDB;