const { MongoClient } = require("mongodb");

export async function connectClient() {
  //FIXME: Add env variable for MongoDB connection string
  const uri =
    "mongodb+srv://filluk:L10QtiezigvRvwJO@cluster0.xis9qpt.mongodb.net/?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  return client;
}

export async function connectDatabase(client: any, dbName: string) {
  return client.db(dbName);
}

export async function insertDocument(
  db: any,
  collection: string,
  document: any
) {
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(db: any, collection: string) {
  return await db.collection(collection).find().toArray();
}
