import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
  featured: boolean;
};

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (routine: Omit<Routine, 'id' | 'createdAt' | 'featured'>) => void;
  updateRoutine: (id: string, routine: Omit<Routine, 'id' | 'createdAt' | 'featured'>) => void;
  deleteRoutine: (id: string) => void;
  toggleFeatured: (id: string) => void;
};

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [routines, setRoutines] = useState<Routine[]>([]);

  // 1. Cargar datos mapeando el entero 0/1 de SQLite a boolean
  const cargarRutinas = async () => {
    try {
      const rawRows = await db.getAllAsync<{
        id: string;
        name: string;
        muscleGroup: string;
        duration: number;
        createdAt: string;
        featured: number;
      }>('SELECT * FROM rutinas ORDER BY id DESC');

      if (rawRows.length === 0) {
        const iniciales = [
          { id: '1', name: 'Press Banca', muscleGroup: 'Pecho', duration: 45, createdAt: new Date().toLocaleDateString(), featured: 1 },
          { id: '2', name: 'Fondos en Paralelas', muscleGroup: 'Tríceps', duration: 30, createdAt: new Date().toLocaleDateString(), featured: 0 },
          { id: '3', name: 'Press Inclinado', muscleGroup: 'Pecho', duration: 40, createdAt: new Date().toLocaleDateString(), featured: 0 },
        ];

        for (const item of iniciales) {
          await db.runAsync(
            'INSERT INTO rutinas (id, name, muscleGroup, duration, createdAt, featured) VALUES (?, ?, ?, ?, ?, ?)',
            [item.id, item.name, item.muscleGroup, item.duration, item.createdAt, item.featured]
          );
        }

        const freshRows = await db.getAllAsync<{
          id: string;
          name: string;
          muscleGroup: string;
          duration: number;
          createdAt: string;
          featured: number;
        }>('SELECT * FROM rutinas ORDER BY id DESC');

        setRoutines(
          freshRows.map((r) => ({
            ...r,
            featured: Boolean(r.featured),
          }))
        );
      } else {
        setRoutines(
          rawRows.map((r) => ({
            ...r,
            featured: Boolean(r.featured),
          }))
        );
      }
    } catch (error) {
      console.error('Error al cargar rutinas:', error);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  // 2. Agregar rutina
  const addRoutine = async (routine: Omit<Routine, 'id' | 'createdAt' | 'featured'>) => {
    const newId = Date.now().toString();
    const newCreatedAt = new Date().toLocaleDateString();

    try {
      await db.runAsync(
        'INSERT INTO rutinas (id, name, muscleGroup, duration, createdAt, featured) VALUES (?, ?, ?, ?, ?, 0)',
        [newId, routine.name, routine.muscleGroup, routine.duration, newCreatedAt]
      );
      cargarRutinas();
    } catch (error) {
      console.error('Error al guardar rutina:', error);
    }
  };

  // 3. Actualizar rutina
  const updateRoutine = async (id: string, updatedData: Omit<Routine, 'id' | 'createdAt' | 'featured'>) => {
    try {
      await db.runAsync(
        'UPDATE rutinas SET name = ?, muscleGroup = ?, duration = ? WHERE id = ?',
        [updatedData.name, updatedData.muscleGroup, updatedData.duration, id]
      );
      cargarRutinas();
    } catch (error) {
      console.error('Error al actualizar rutina:', error);
    }
  };

  // 4. Eliminar rutina
  const deleteRoutine = async (id: string) => {
    try {
      await db.runAsync('DELETE FROM rutinas WHERE id = ?', [id]);
      cargarRutinas();
    } catch (error) {
      console.error('Error al eliminar rutina:', error);
    }
  };

  // 5. Alternar rutina destacada (SOLO UNA a la vez)
  const toggleFeatured = async (id: string) => {
    try {
      const actual = routines.find((r) => r.id === id);
      const nuevoEstado = !actual?.featured;

      // Reseteamos todas a 0 en SQLite
      await db.runAsync('UPDATE rutinas SET featured = 0');

      // Si la estamos activando, marcamos solo esta como 1
      if (nuevoEstado) {
        await db.runAsync('UPDATE rutinas SET featured = 1 WHERE id = ?', [id]);
      }

      cargarRutinas();
    } catch (error) {
      console.error('Error al alternar rutina destacada:', error);
    }
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine, toggleFeatured }}>
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutineContext() {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutineContext debe ser usado dentro de un RoutineProvider');
  }
  return context;
}