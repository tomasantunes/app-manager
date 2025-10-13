const { MongoClient, ObjectId } = require("mongodb");
const secretConfig = require("../secret-config");

const uri = secretConfig.mongoConnection;
const client = new MongoClient(uri);
const db = client.db("app-manager");

async function init() {
  try {
    await client.connect();

    console.log("Connected to MongoDB");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

async function insertDocument(document, collection) {
    try {
        await client.connect();
        const c = db.collection(collection);

        const result = await c.insertOne(document);
        console.log("Inserted one document to collection " + collection + ":", result.insertedId);

    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

async function getApplications() {
  try {
    await client.connect();
    const Applications = db.collection("Applications");

    const cursor = Applications.find();
    const results = await cursor.toArray();

    return results;
  } catch(err) {
    console.log(err);
    return false;
  } finally {
    await client.close();
  }
}

async function updateApplication(id, updatedData) {
  try {
    await client.connect();
    const collection = db.collection("Applications");
    const filter = { _id: new ObjectId(id) };

    // Perform update
    const result = await collection.updateOne(filter, { $set: updatedData });

    console.log(`${result.matchedCount} document(s) matched`);
    console.log(`${result.modifiedCount} document(s) updated`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

async function deleteDocument(id, collection) {
  try {
    await client.connect();
    const c = db.collection(collection);
    const result = await c.deleteOne({ _id: new ObjectId(id) });
    console.log(`Deleted document with id ${id} from collection ${collection}`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

module.exports = {
    init,
    insertDocument,
    getApplications,
    updateApplication,
    deleteDocument,
    default: {
        init,
        insertDocument,
        getApplications,
        updateApplication,
        deleteDocument
    }
};

