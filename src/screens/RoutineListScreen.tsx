import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function RoutineListScreen({ navigation }: any) {
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
          <Text style={styles.cardTitle}>Rutina Destacada</Text>
        </View>

        <Text style={styles.cardSubtitle}>
          Enfoque de fuerza e hipertrofia para pectoral mayor y tríceps.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChestDetail')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Ver Rutina de Pecho</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
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