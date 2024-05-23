import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_URI);

  const { ObjectId } = require("mongodb");

  if (!ObjectId.isValid(req.query.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  var o_id = new ObjectId(req.query.id);
  // 6647ba76e35f8e1deb426f7e
  try {
    await client.connect();
    const database = client.db("notes"); // Choose a name for your database
    const collection = database.collection("notes"); // Choose a name for your collection
    const allData = await collection.find({ _id: o_id }).toArray();
    res.status(200).json(allData);
  } catch (error) {
    res.status(200).json("error");
  } finally {
    await client.close();
  }
}
