import mongoose from "mongoose";

const connectionString = process.env.DB_ConnectionString;

if (!connectionString) {
    console.log('DB ConnectionString Missing...');
    process.exit(1);
}


export async function connectDB() {

    mongoose.connect(`${connectionString}`);
    const db = mongoose.connection;

    db.once("error", (err) => {
        console.log(`MongoDB Error: ${err.message}`);
    })

    db.on('open', () => {
        console.log("DB Connected");
    })
};

