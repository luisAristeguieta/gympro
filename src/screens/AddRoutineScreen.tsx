import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutineContext } from '../context/RoutineContext';

export default function AddRoutineScreen({ navigation, route }: any) {
  const { routines, addRoutine, updateRoutine } = useRoutineContext();
  const IdToEdit = route.params?.routineId;

  const routineToEdit = routines.find((r) => r.id === IdToEdit);

  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (routineToEdit) {
      setName(routineToEdit.name);
      setMuscleGroup(routineToEdit.muscleGroup);
      setDuration(routineToEdit.duration.toString());
    } else {
      setName('');
      setMuscleGroup('');
      setDuration('');
    }
  }, [IdToEdit, routineToEdit]);

  const handleSave = () => {
    const clearName = name.trim();
    const clearmuscleGroup = muscleGroup.trim();
    const clearDuration = duration.trim();

    if (!clearName || !clearmuscleGroup || !clearDuration) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const durationNumber = parseFloat(clearDuration);

    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert('Error', 'La duración debe ser un número mayor a 0.');
      return;
    }

    if (routineToEdit) {
      updateRoutine(routineToEdit.id, {
        name: clearName,
        muscleGroup: clearmuscleGroup,
        duration: durationNumber,
      });
      Alert.alert('Éxito', 'Rutina actualizada correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      addRoutine({
        name: clearName,
        muscleGroup: clearmuscleGroup,
        duration: durationNumber,
      });
      Alert.alert('Éxito', 'Rutina agregada correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formCard}>
            <View style={styles.cardHeader}>
              <Ionicons
                name={routineToEdit ? 'pencil-sharp' : 'add-circle-outline'}
                size={26}
                color="#FF6B00"
              />
              <Text style={styles.headerTitle}>
                {routineToEdit ? 'Modificar Rutina' : 'Nueva Rutina'}
              </Text>
            </View>

            <Text style={styles.label}>Nombre de la Rutina</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Press Militar"
              placeholderTextColor="#666666"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Grupo Muscular</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Hombros / Trapecio"
              placeholderTextColor="#666666"
              value={muscleGroup}
              onChangeText={setMuscleGroup}
            />

            <Text style={styles.label}>Duración (minutos)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 45"
              placeholderTextColor="#666666"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSave}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>
                {routineToEdit ? 'Actualizar Rutina' : 'Guardar Rutina'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 20,
  },
  formCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#383838',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 26,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});