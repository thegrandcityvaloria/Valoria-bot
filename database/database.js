import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/valoria.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS players (
            id TEXT PRIMARY KEY,
            username TEXT,
            race TEXT,
            job TEXT,
            level INTEGER DEFAULT 1,
            exp INTEGER DEFAULT 0,
            ruby INTEGER DEFAULT 1000,
            hp INTEGER DEFAULT 100,
            mp INTEGER DEFAULT 100,
            atk INTEGER DEFAULT 10,
            def INTEGER DEFAULT 10,
            dex INTEGER DEFAULT 10,
            agi INTEGER DEFAULT 10,
            vit INTEGER DEFAULT 10
        )
    `);
});

export default db;
