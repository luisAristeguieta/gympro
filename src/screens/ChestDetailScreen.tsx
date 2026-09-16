import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ChestDetailScreen() {
  const exercises = [
    { name: 'Press de Banca Plano', sets: '4 series x 8-10 reps' },
    { name: 'Press Inclinado Mancuernas', sets: '3 series x 10-12 reps' },
    { name: 'Aperturas en Polea', sets: '3 series x 15 reps' },
    { name: 'Fondos en Paralelas', sets: '3 series al fallo' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Plan de Entrenamiento</Text>

        {exercises.map((item, index) => (
          <View key={index} style={styles.exerciseCard}>
            <View style={styles.exerciseLeft}>
              <View style={styles.indexCircle}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>
              <View>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseSets}>{item.sets}</Text>
              </View>
            </View>
            <Ionicons name="checkmark-circle-outline" size={24} color="#FF6B00" />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  exerciseCard: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B00',
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  indexCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exerciseSets: {
    fontSize: 13,
    color: '#A0A0A0',
    marginTop: 2,
  },
});