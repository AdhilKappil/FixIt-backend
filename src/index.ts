
import { httpServer } from "./infrastructure/config/app"
import connectDB from "./infrastructure/config/db"
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = () => {

    httpServer.listen(PORT, () => {
    console.log(`server has been connected on http://localhost/${PORT}`);
    connectDB(); 
  });
};

start();