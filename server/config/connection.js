const mongoose = require('mongoose');

const {MongoClient} = require('mongodb');


async function main(){

  const uri = "mongodb+srv://Test:test123@cluster0.is4148m.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await  listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
}




// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumator-db',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

module.exports = mongoose.connection;
