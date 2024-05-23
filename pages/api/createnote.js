import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const client = new MongoClient(process.env.MONGO_URI);

    // 6647ba76e35f8e1deb426f7e
    try {
      await client.connect();
      const database = client.db("notes"); // Choose a name for your database
      const collection = database.collection("notes"); // Choose a name for your collection
      const allData = await collection.insertOne({
        title: req.body.title,
        note: req.body.note,
        label: req.body.label,
      });
      res.status(200).json("Inserted");
    } catch (error) {
      res.status(200).json("error");
    } finally {
      await client.close();
    }
  }
}
