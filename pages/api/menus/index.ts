import { NextApiRequest, NextApiResponse } from "next";
import {
  connectClient,
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../utils/mongo/db-util";

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

    if (req.method === "POST") {
      // Add a new meal
      const menu = req.body;
      await insertDocument(db, collectionName, menu);

      res.json(menu);
    } else if (req.method === "GET") {
      // Find all documents in the collection
      const menus = await getAllDocuments(db, collectionName);

      res.json(menus);
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
