import React, { useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutineContext } from '../context/RoutineContext';

export default function ProgressScreen() {
  const { routines } = useRoutineContext();

  // Cálculos dinámicos basados en el estado actual de SQLite / Context
  const stats = useMemo(() => {
    const totalRoutines = routines.length;

    if (totalRoutines === 0) {
      return {
        totalRoutines: 0,
        totalDuration: 0,
        averageDuration: 0,
        topMuscle: 'Sin datos',
      };
    }

    // 1. Duración total
    const totalDuration = routines.reduce(
      (sum, item) => sum + (Number(item.duration) || 0),
      0
    );

    // 2. Duración promedio
    const averageDuration = Math.round(totalDuration / totalRoutines);

    // 3. Grupo muscular predominante (frecuencia)
    const muscleCounts: Record<string, number> = {};
    routines.forEach((r) => {
      const muscle = r.muscleGroup.trim();
      muscleCounts[muscle] = (muscleCounts[muscle] || 0) + 1;
    });

    let topMuscle = 'N/A';
    let maxCount = 0;

    Object.entries(muscleCounts).forEach(([muscle, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topMuscle = muscle;
      }
    });

    return {
      totalRoutines,
      totalDuration,
      averageDuration,
      topMuscle,
    };
  }, [routines]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Ionicons name="stats-chart" size={40} color="#FF6B00" />
          <Text style={styles.title}>Panel de Progreso</Text>
          <Text style={styles.subtitle}>Resumen dinámico de tus entrenamientos</Text>
        </View>

        {/* Grid de Métricas */}
        <View style={styles.grid}>
          {/* Total Rutinas */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="barbell-outline" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.metricValue}>{stats.totalRoutines}</Text>
            <Text style={styles.metricLabel}>Total Rutinas</Text>
          </View>

          {/* Duración Total */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="time-outline" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.metricValue}>{stats.totalDuration} min</Text>
            <Text style={styles.metricLabel}>Duración Total</Text>
          </View>

          {/* Duración Promedio */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="speedometer-outline" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.metricValue}>{stats.averageDuration} min</Text>
            <Text style={styles.metricLabel}>Promedio por Sesión</Text>
          </View>

          {/* Grupo Muscular Frecuente */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="flame-outline" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.metricValue} numberOfLines={1}>
              {stats.topMuscle}
            </Text>
            <Text style={styles.metricLabel}>Músculo Principal</Text>
          </View>
        </View>
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 4,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 107, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
});