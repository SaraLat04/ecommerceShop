import mongoose from "mongoose";

export const connectDB = async()=> {
  await mongoose.connect('mongodb://latsara04:user1234@cluster0-shard-00-00.5tyrs.mongodb.net:27017,cluster0-shard-00-01.5tyrs.mongodb.net:27017,cluster0-shard-00-02.5tyrs.mongodb.net:27017/ecommerceShop?ssl=true&replicaSet=atlas-3n41nb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0').
  then(()=>console.log("DB Connected"))
} 

