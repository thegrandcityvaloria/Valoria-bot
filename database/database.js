import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/valoria.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("📦 Database Connected");
    }
});

export default db;
