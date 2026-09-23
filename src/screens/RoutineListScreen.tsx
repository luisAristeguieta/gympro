import { Text, View, StyleSheet, TouchableOpacity, Image, Alert,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutineContext} from '../context/RoutineContext';


export default function RoutineListScreen({ navigation }: any) {

  const { routines, deleteRoutine } = useRoutineContext();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Eliminar Rutina',
      `¿Estás seguro de que deseas eliminar "${name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteRoutine(id) },
      ]
    );
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* SECCIÓN SUPERIOR: Logo Oficial (Flexbox) */}
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* SECCIÓN INFERIOR: Contenido y Acciones (Flexbox) */}
      <View style={styles.bottomSection}>
        <View style={styles.cardHeader}>
          <Ionicons name="flame" size={24} color="#FF6B00" />
          <Text style={styles.cardTitle}>Rutinas Destacada</Text>
        </View>

        <View >
        <TouchableOpacity
          onPress={() => navigation.navigate('AddRoutine')}>
          <Ionicons name="add" size={22} color="#FFFFFF" />
          <Text >Agregar Rutina</Text>
        </TouchableOpacity>
      </View>

      {/* Listado de rutinas */}

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View >
            <View >
              <Text >{item.name}</Text>
              <Text >{item.muscleGroup}</Text>
              <Text >{item.duration} min </Text>
            </View>
            <View >
              {/* Ver Rutina */}
              <TouchableOpacity
                onPress={() => navigation.navigate('ChestDetailScreen', { routineId: item.id })}
              >
                <Ionicons name="eye-outline" size={20} color="#3226D7" />
              </TouchableOpacity>

              {/* Editar Rutina*/}
              <TouchableOpacity
                onPress={() => navigation.navigate('AddRoutine', { routineId: item.id })}
              >
                <Ionicons name="pencil-outline" size={20} color="#D75826" />
              </TouchableOpacity>

              {/* Eliminar directo con confirmación */}
              <TouchableOpacity
                onPress={() => handleDelete(item.id, item.name)}
              >
                <Ionicons name="trash-outline" size={20} color="#F10303" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      ListEmptyComponent={
          <View >
            <Text>No hay rutinas registradas.</Text>
          </View>
        }
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
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoImage: {
    width: '85%',
    height: '85%',
  },
  bottomSection: {
    flex: 0.55,
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 28,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});