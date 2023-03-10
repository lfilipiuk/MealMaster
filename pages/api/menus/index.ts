import { NextApiRequest, NextApiResponse } from "next";
import {
  connectClient,
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../utils/mongo/db-util";
import { ObjectId } from "mongodb";

// Replace with your database name
const dbName = "mealmaster";

// Replace with your collection name
const collectionName = "menus";

//if method is GET, return all meals
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Create a new MongoClient
    const client = await connectClient();

    // Connect to the database
    const db = await connectDatabase(client, dbName);

    // Get a handle on collection
    const collection = db.collection(collectionName);

    if (req.method === "POST") {
      // Add a new meal
      const { menu, userId, date } = req.body;
      // Create or update a meal
      const filter = { userId: userId, date: date };
      const update = { $set: { userId: userId, date: date, menu: menu } };
      const options = { upsert: true };
      const result = await collection.updateOne(filter, update, options);

      res.status(201).json(result);
    } else if (req.method === "GET") {
      // Find all documents in the collection
      const menus = await getAllDocuments(db, collectionName);

      res.status(200).json(menus);
    } else {
      res.status(405).send({ message: "Method Not Allowed" });
    }

    // Close the connection to the server
    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default handler;
