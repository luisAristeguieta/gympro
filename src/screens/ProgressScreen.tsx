import React, { useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutineContext } from '../context/RoutineContext';

export default function ProgressScreen() {
  const { routines } = useRoutineContext();

  // Buscar rutina destacada actual
  const featuredRoutine = useMemo(() => {
    return routines.find((r) => r.featured);
  }, [routines]);

  // Cálculos dinámicos
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

    const totalDuration = routines.reduce(
      (sum, item) => sum + (Number(item.duration) || 0),
      0
    );

    const averageDuration = Math.round(totalDuration / totalRoutines);

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

        {/* Sección: Rutina Destacada */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredHeader}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.featuredTitle}>Rutina Destacada</Text>
          </View>

          {featuredRoutine ? (
            <View style={styles.featuredCard}>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>{featuredRoutine.name}</Text>
                <Text style={styles.featuredMuscle}>{featuredRoutine.muscleGroup}</Text>
              </View>
              <View style={styles.featuredDurationBadge}>
                <Ionicons name="time" size={14} color="#FFD700" />
                <Text style={styles.featuredDurationText}>{featuredRoutine.duration} min</Text>
              </View>
            </View>
          ) : (
            <View style={styles.featuredEmpty}>
              <Text style={styles.featuredEmptyText}>
                No has marcado ninguna rutina como destacada aún.
              </Text>
            </View>
          )}
        </View>

        {/* Grid de Métricas */}
        <View style={styles.grid}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="barbell-outline" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.metricValue}>{stats.totalRoutines}</Text>
            <Text style={styles.metricLabel}>Total Rutinas</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="time-outline" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.metricValue}>{stats.totalDuration} min</Text>
            <Text style={styles.metricLabel}>Duración Total</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="speedometer-outline" size={24} color="#FF6B00" />
            </View>
            <Text style={styles.metricValue}>{stats.averageDuration} min</Text>
            <Text style={styles.metricLabel}>Promedio por Sesión</Text>
          </View>

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
    marginBottom: 20,
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
  featuredContainer: {
    width: '100%',
    marginBottom: 20,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  featuredTitle: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featuredCard: {
    backgroundColor: '#28241A',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  featuredInfo: {
    flex: 1,
  },
  featuredName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  featuredMuscle: {
    color: '#CCCCCC',
    fontSize: 13,
    marginTop: 2,
  },
  featuredDurationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  featuredDurationText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 13,
  },
  featuredEmpty: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  featuredEmptyText: {
    color: '#777777',
    fontSize: 13,
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