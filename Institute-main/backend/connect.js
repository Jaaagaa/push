import mongoose from "mongoose";
import dotnev from "dotenv"

//establishing connection
export const connect = ()=>{
    try{
        dotnev.config();
        mongoose.set("strictQuery",false)
        mongoose.connect(process.env.MONGO_URI)
    }catch(err){
        console.log(err)
    }     
}