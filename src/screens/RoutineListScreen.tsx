import React, { useState, useMemo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutineContext } from '../context/RoutineContext';

const FILTER_OPTIONS = ['Todos', 'Pecho', 'Espalda', 'Piernas'];

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine, toggleFeatured } = useRoutineContext();
  const [selectedMuscle, setSelectedMuscle] = useState<string>('Todos');

  const filteredRoutines = useMemo(() => {
    if (selectedMuscle === 'Todos') return routines;
    return routines.filter(
      (r) => r.muscleGroup.trim().toLowerCase() === selectedMuscle.toLowerCase()
    );
  }, [routines, selectedMuscle]);

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
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{filteredRoutines.length}</Text>
            </View>
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

        {/* Barra de Filtro por Grupo Muscular */}
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          >
            {FILTER_OPTIONS.map((filter) => {
              const isSelected = selectedMuscle === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterChip, isSelected && styles.filterChipActive]}
                  onPress={() => setSelectedMuscle(filter)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Listado de rutinas */}
        <FlatList
          data={filteredRoutines}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.card, item.featured && styles.cardFeatured]}>
              <View style={styles.cardInfo}>
                <View style={styles.titleRowCard}>
                  <Text style={styles.routineName}>{item.name}</Text>
                  {/* Botón de destacar */}
                  <TouchableOpacity
                    onPress={() => toggleFeatured(item.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={item.featured ? 'star' : 'star-outline'}
                      size={20}
                      color={item.featured ? '#FFD700' : '#666666'}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.routineMuscle}>{item.muscleGroup}</Text>
                <View style={styles.badgeContainer}>
                  <Ionicons name="time-outline" size={14} color="#FF6B00" />
                  <Text style={styles.routineDuration}>{item.duration} min</Text>
                  {item.featured && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>Destacada</Text>
                    </View>
                  )}
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
              <Text style={styles.emptyText}>
                No hay rutinas para "{selectedMuscle}".
              </Text>
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
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flex: 1,
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
    marginBottom: 12,
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
  countBadge: {
    backgroundColor: 'rgba(255, 107, 0, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countBadgeText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
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
  filterWrapper: {
    marginBottom: 14,
  },
  filterList: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#242424',
    borderWidth: 1,
    borderColor: '#333333',
  },
  filterChipActive: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  filterChipText: {
    fontSize: 13,
    color: '#A0A0A0',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
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
  cardFeatured: {
    borderColor: '#FFD700',
    backgroundColor: '#28241A',
  },
  cardInfo: {
    flex: 1,
  },
  titleRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    gap: 8,
    marginTop: 6,
  },
  routineDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B00',
  },
  featuredBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featuredBadgeText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: 'bold',
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