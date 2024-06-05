import mongoose from "mongoose";
require("dotenv").config()

const DB_String: string = process.env.MONGO_URI || ""

const connectDB = async () => {
    try {
        await mongoose.connect(DB_String)
            .then((data: any) => console.log(`db connection on ${data.connection.host}`))
    } catch (error: any) {
        console.log(error.message)
        setTimeout(connectDB, 5000)
    }
}

export default connectDB