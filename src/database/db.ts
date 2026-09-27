import { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'gympro.db';

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS rutinas (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      muscleGroup TEXT NOT NULL,
      duration REAL NOT NULL,
      createdAt TEXT NOT NULL,
      featured INTEGER DEFAULT 0
    );
  `);

  // Migración defensiva: agrega la columna si la tabla ya había sido creada antes sin ella
  try {
    await db.execAsync(`ALTER TABLE rutinas ADD COLUMN featured INTEGER DEFAULT 0;`);
  } catch (e) {
    // Si la columna ya existe, SQLite lanzará un error que ignoramos de forma segura
  }

  console.log('Tabla de rutinas lista con soporte featured');
};