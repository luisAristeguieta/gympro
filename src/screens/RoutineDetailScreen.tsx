import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoutineContext } from '../context/RoutineContext';

export default function RoutineDetailScreen({ route, navigation }: any) {
  const idToView = route.params?.routineId;
  const { routines } = useRoutineContext();

  const routine = routines.find((r) => r.id === idToView);

  if (!routine) {
    return (
      <SafeAreaView>
        <Text>Rutina no encontrada</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Volver al listado</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>ID: #{routine.id}</Text>
        <Text>Nombre: {routine.name}</Text>
        <Text>Grupo Muscular: {routine.muscleGroup}</Text>
        <Text>Duración: {routine.duration} mins</Text>
        <Text>Fecha de creación: {routine.createdAt}</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}