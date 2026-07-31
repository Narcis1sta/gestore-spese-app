import * as SQLite from 'expo-sqlite';
export async function initDb(db:SQLite.SQLiteDatabase) {
 await db.execAsync(`PRAGMA journal_mode = WAL;
 CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL, date TEXT NOT NULL, payment TEXT NOT NULL, notes TEXT DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS custom_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, color TEXT NOT NULL);`);
}
