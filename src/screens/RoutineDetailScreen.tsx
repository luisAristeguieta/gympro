import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutineContext } from '../context/RoutineContext';

export default function RoutineDetailScreen({ route, navigation }: any) {
  const idToView = route.params?.routineId;
  const { routines } = useRoutineContext();

  const routine = routines.find((r) => r.id === idToView);

  if (!routine) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#FF6B00" />
        <Text style={styles.errorTitle}>Rutina no encontrada</Text>
        <Text style={styles.errorSubtitle}>
          La rutina buscada fue eliminada o no existe.
        </Text>
        <TouchableOpacity
          style={styles.backButtonSecondary}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonSecondaryText}>Volver al listado</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {/* Cabecera con ID y fecha */}
        <View style={styles.topInfo}>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>ID: #{routine.id.slice(-4)}</Text>
          </View>
          <Text style={styles.dateText}>{routine.createdAt}</Text>
        </View>

        {/* Ficha Principal */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="barbell-outline" size={36} color="#FF6B00" />
          </View>

          <Text style={styles.routineTitle}>{routine.name}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="fitness-outline" size={20} color="#A0A0A0" />
            <Text style={styles.detailLabel}>Grupo Muscular:</Text>
            <Text style={styles.detailValue}>{routine.muscleGroup}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#A0A0A0" />
            <Text style={styles.detailLabel}>Duración estimada:</Text>
            <Text style={styles.detailValueOrange}>{routine.duration} mins</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.footerNote}>
            Rutina registrada en memoria local con Context API.
          </Text>
        </View>

        {/* Botón Volver */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Volver al Listado</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  errorSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  backButtonSecondary: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  backButtonSecondaryText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  idBadge: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  idText: {
    color: '#FF6B00',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateText: {
    color: '#777777',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A180E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  routineTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 6,
  },
  detailLabel: {
    color: '#8E8E93',
    fontSize: 15,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  detailValueOrange: {
    color: '#FF6B00',
    fontSize: 15,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 18,
  },
  footerNote: {
    color: '#666666',
    fontSize: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
    gap: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});