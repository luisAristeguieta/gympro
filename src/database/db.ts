import { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'gympro.db';

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS rutinas (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      muscleGroup TEXT NOT NULL,
      duration REAL NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
  console.log('Tabla de rutinas lista');
};