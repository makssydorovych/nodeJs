import {MongoClient} from 'mongodb';
const mongoUri = process.env.MongoUri || "mongodb://0.0.0.0:27017";
export const client = new MongoClient(mongoUri);
export async function runDb(){
    try{
        await client.connect();
        await client.db("products").command({ping: 1})
        console.log("conect db")
    }catch {
        console.log("Cant conect to db")
        await client.close();
    }
}