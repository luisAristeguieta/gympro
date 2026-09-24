import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image,Alert, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutineContext } from '../context/RoutineContext';

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine } = useRoutineContext();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Eliminar Rutina',
      `¿Estás seguro de que deseas eliminar "${name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteRoutine(id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* SECCIÓN SUPERIOR: Logo Oficial */}
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* SECCIÓN INFERIOR: Contenido Dinámico */}
      <View style={styles.bottomSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleRow}>
            <Ionicons name="flame" size={24} color="#FF6B00" />
            <Text style={styles.cardTitle}>Rutinas</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddRoutine')}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {/* Listado de rutinas */}
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.routineName}>{item.name}</Text>
                <Text style={styles.routineMuscle}>{item.muscleGroup}</Text>
                <View style={styles.badgeContainer}>
                  <Ionicons name="time-outline" size={14} color="#FF6B00" />
                  <Text style={styles.routineDuration}>{item.duration} min</Text>
                </View>
              </View>

              <View style={styles.actionsContainer}>
                {/* Ver Detalle */}
                <TouchableOpacity
                  style={[styles.actionBtn, styles.viewBtn]}
                  onPress={() =>
                    navigation.navigate('DetailRoutine', { routineId: item.id })
                  }
                >
                  <Ionicons name="eye-outline" size={18} color="#007AFF" />
                </TouchableOpacity>

                {/* Editar */}
                <TouchableOpacity
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={() =>
                    navigation.navigate('AddRoutine', { routineId: item.id })
                  }
                >
                  <Ionicons name="pencil-outline" size={18} color="#FF6B00" />
                </TouchableOpacity>

                {/* Eliminar */}
                <TouchableOpacity
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={() => handleDelete(item.id, item.name)}
                >
                  <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="barbell-outline" size={40} color="#555555" />
              <Text style={styles.emptyText}>No hay rutinas registradas.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topSection: {
    height: 110, // Altura fija y reducida para que no empuje hacia abajo
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flex: 1, // Ocupa todo el resto disponible de la pantalla hacia arriba
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B00',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: '#242424',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303030',
  },
  cardInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  routineMuscle: {
    fontSize: 13,
    color: '#A0A0A0',
    marginTop: 2,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  routineDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B00',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 10,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtn: {
    backgroundColor: 'rgba(0, 122, 255, 0.12)',
  },
  editBtn: {
    backgroundColor: 'rgba(255, 107, 0, 0.12)',
  },
  deleteBtn: {
    backgroundColor: 'rgba(255, 59, 48, 0.12)',
  },
  emptyContainer: {
    paddingTop: 40,
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    color: '#777777',
    fontSize: 14,
  },
});