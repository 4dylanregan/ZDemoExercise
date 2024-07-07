
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Dylan:XyVHujpWs8dVZR27@zealthy.ikfkqjt.mongodb.net/?appName=Zealthy";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
    if (!_connection) {
        await client.connect();
        _db = await client.db("Zealthy")
    }

  return _db;
}
