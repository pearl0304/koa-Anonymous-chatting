import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const uri =`mongodb+srv://kylie:${process.env.MONGODB_PW}@cluster0.sehaq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('mongoDB Connection')

export default client