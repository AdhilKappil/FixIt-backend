
import { app } from "./infrastructureLayer/config/app"
import connectDB from "./infrastructureLayer/config/db"
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = () => {

    app.get('/',(req,res)=>{
        res.send('hello')
    })
  app.listen(PORT, () => {
    console.log(`server has been connected on http://localhost/${PORT}`);
    connectDB(); 
  });
};

start();