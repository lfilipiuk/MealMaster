//if method is GET, return all meals
import { NextApiRequest, NextApiResponse } from "next";
import {
  connectClient,
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../utils/mongo/db-util";
import { useUser } from "@auth0/nextjs-auth0/client";

// Replace with your database name
const dbName = "mealmaster";

// Replace with your collection name
const collectionName = "menus";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Create a new MongoClient
    const client = await connectClient();

    // Connect to the database
    const db = await connectDatabase(client, dbName);

    if (req.method === "GET") {
      // Find all documents for a specified userId
      const menus = await db
        .collection(collectionName)
        .find({ userId: req.query.userId })
        .toArray();

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
