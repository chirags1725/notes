import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const database = client.db("notes"); // Choose a name for your database
    const collection = database.collection("notes"); // Choose a name for your collection
    const allData = await collection.find({}).sort({ _id: -1 }).toArray();
    res.status(200).json(allData);
  } catch (error) {
    res.status(200).json("error");
  } finally {
    await client.close();
  }
}
