import {MongoClient} from "mongodb";

const mongoUri = process.env.MongoUri || "mongodb://0.0.0.0:27017";
export const client = new MongoClient(mongoUri);
export async function RunDb(){
    try{
        await client.connect();
        await client.db("products").command({ping: 1})
        console.log("connect db")
    }catch {
        console.log("Cant connect to db")
        await client.close();
    }
}