const { MongoClient } = require("mongodb");

const URI = process.env.DB_URI || "mongodb://localhost:27017";
const DATABASE = process.env.DATABASE_NAME || "urlShortener";

let dbInstance = null;

async function Database() {
    if (dbInstance) return dbInstance; 

    try {
        const client = new MongoClient(URI);
        await client.connect();
        dbInstance = client.db(DATABASE); // Cache it
        console.log("Connected successfully to MongoDB");
        return dbInstance;
    } catch (err) {
        console.error("Failed Connection!", err);
        throw err; // Rethrow to handle it in your main app if needed
    }
}

module.exports = Database;
