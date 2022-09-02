import { MongoClient, ObjectId } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(process.env.DB_URL!);
  return client;
}

export async function insertDocument(client: any, collection: string, document: any) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllPredictions(client: any, collection: string, userId: string, sort: string) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find({ userId: userId })
    .sort(sort)
    .toArray();
  return documents;
}

export async function getSinglePrediction(client: any, collection: string, predictionId: string) {
  const db = client.db();
  const documents = await db.collection(collection).find().toArray();
  const singlePrediction = documents.filter((prediction: any) => {
    return new ObjectId(prediction._id).toString() === predictionId;
  });
  return singlePrediction;
}

export async function deleteSinglePrediction(client: any, collection: string, predictionId: string) {
  const db = client.db();
  const selectedPrediction = await db.collection(collection).findOne({
    _id: new ObjectId(predictionId),
  });
  await db.collection("deletedPredictions").insertOne(selectedPrediction);
  const deletedPrediction = await db
    .collection(collection)
    .deleteOne({ _id: new ObjectId(predictionId) });
  return deletedPrediction;
}
