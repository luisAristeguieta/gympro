import React, { createContext, useState, useContext, ReactNode } from 'react'

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
  const [routines, setRoutines] = useState<Routine[]>([
    { id: '1', name: 'Press Banca', muscleGroup: 'Pecho', duration: 45, createdAt: new Date().toLocaleDateString() },
    { id: '2', name: 'Fondos en Paralelas', muscleGroup: 'Tríceps', duration: 30, createdAt: new Date().toLocaleDateString() },
    { id: '3', name: 'Press Inclinado', muscleGroup: 'Pecho', duration: 40, createdAt: new Date().toLocaleDateString() },
  ]);

  const addRoutine = (routine: Omit<Routine, 'id' | 'createdAt'>) => {
    const newRoutine: Routine = {
      ...routine,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
    };

    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
  };

  const updateRoutine = (id: string, updatedData: Omit<Routine, 'id' | 'createdAt'>) => {
    setRoutines((prevRoutines) =>
      prevRoutines.map((routine) => routine.id === id ? { ...routine, ...updatedData } : routine));
  };

  const deleteRoutine = (id: string) => {
    setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== id));
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