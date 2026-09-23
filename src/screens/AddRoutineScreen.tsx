import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        };

        const durationNumber = parseFloat(clearDuration);

        if (isNaN(durationNumber) || durationNumber <= 0) {
            Alert.alert('Error', 'La duracion debe ser un número válido.');
            return;
        };

        if (routineToEdit) {
            updateRoutine(routineToEdit.id, { name: clearName, muscleGroup: clearmuscleGroup, duration: durationNumber });
            Alert.alert('Éxito', 'Rutina actualizada correctamente.', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } else {
            addRoutine({ name: clearName, muscleGroup: clearmuscleGroup, duration: durationNumber });
            Alert.alert('Éxito', 'Rutina agregada correctamente.', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        };
    };

    if (IdToEdit && !routineToEdit) {
        return (
            <SafeAreaView>
                <Text >Cargando Rutina...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Nombre</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                    />
                    <Text>Grupo Muscular</Text>
                    <TextInput
                        value={muscleGroup}
                        onChangeText={setMuscleGroup}
                    />
                    <Text>Duracion (mins)</Text>
                    <TextInput
                        value={duration}
                        onChangeText={setDuration}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity onPress={handleSave}>
                        <Text>{routineToEdit ? 'Actualizar Rutina' : 'Agregar Rutina'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}