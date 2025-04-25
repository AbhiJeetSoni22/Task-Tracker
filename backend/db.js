import mongoose from "mongoose";

const dbConnect = async (url)=>{
    try { 
        await mongoose.connect(url);
        console.log('mongodb connect ')
    } catch (error) {
        console.error(error);
    }
}
export default dbConnect;