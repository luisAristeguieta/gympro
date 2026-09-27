import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { useSQLiteContext } from 'expo-sqlite'

export type Routine = {
    id: string;
    name: string;
    muscleGroup: string;
    duration: number;
    createdAt: string;
};

type RoutineContextType = {
    routines: Routine[]
    addRoutine: (routine: Omit<Routine, 'id' | 'createdAt'>) => void;
    updateRoutine: (id: string, routine: Omit<Routine, 'id' | 'createdAt'>) => void
    deleteRoutine: (id: string) => void
};

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [routines, setRoutines] = useState<Routine[]>([]);

  // 1. Cargar datos desde SQLite al montar
  const cargarRutinas = async () => {
    try {
      const resultado = await db.getAllAsync<Routine>('SELECT * FROM rutinas ORDER BY id DESC');
      
      if (resultado.length === 0) {
        // Rutinas iniciales si la base de datos está vacía
        const iniciales: Routine[] = [
          { id: '1', name: 'Press Banca', muscleGroup: 'Pecho', duration: 45, createdAt: new Date().toLocaleDateString() },
          { id: '2', name: 'Fondos en Paralelas', muscleGroup: 'Tríceps', duration: 30, createdAt: new Date().toLocaleDateString() },
          { id: '3', name: 'Press Inclinado', muscleGroup: 'Pecho', duration: 40, createdAt: new Date().toLocaleDateString() },
        ];

        for (const item of iniciales) {
          await db.runAsync(
            'INSERT INTO rutinas (id, name, muscleGroup, duration, createdAt) VALUES (?, ?, ?, ?, ?)',
            [item.id, item.name, item.muscleGroup, item.duration, item.createdAt]
          );
        }

        const freshRows = await db.getAllAsync<Routine>('SELECT * FROM rutinas ORDER BY id DESC');
        setRoutines(freshRows);
      } else {
        setRoutines(resultado);
      }
    } catch (error) {
      console.error('Error al cargar rutinas:', error);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  // 2. Agregar rutina a SQLite y refrescar estado
  const addRoutine = async (routine: Omit<Routine, 'id' | 'createdAt'>) => {
    const newId = Date.now().toString();
    const newCreatedAt = new Date().toLocaleDateString();

    try {
      await db.runAsync(
        'INSERT INTO rutinas (id, name, muscleGroup, duration, createdAt) VALUES (?, ?, ?, ?, ?)',
        [newId, routine.name, routine.muscleGroup, routine.duration, newCreatedAt]
      );
      cargarRutinas();
    } catch (error) {
      console.error('Error al guardar rutina:', error);
    }
  };

  // 3. Actualizar rutina en SQLite y refrescar estado
  const updateRoutine = async (id: string, updatedData: Omit<Routine, 'id' | 'createdAt'>) => {
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

  // 4. Eliminar rutina en SQLite y refrescar estado
  const deleteRoutine = async (id: string) => {
    try {
      await db.runAsync('DELETE FROM rutinas WHERE id = ?', [id]);
      cargarRutinas();
    } catch (error) {
      console.error('Error al eliminar rutina:', error);
    }
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine }}>
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
};