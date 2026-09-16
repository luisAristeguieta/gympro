import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigators() {
  return (
    <Drawer.Navigator
      initialRouteName="TrainingDrawer"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1E1E1E',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FF6B00',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
        drawerStyle: {
          backgroundColor: '#121212',
          width: 270,
        },
        drawerActiveTintColor: '#FF6B00',
        drawerInactiveTintColor: '#A0A0A0',
        drawerActiveBackgroundColor: '#1E1E1E',
      }}
    >
      <Drawer.Screen
        name="TrainingDrawer"
        component={TabNavigator}
        options={{
          title: 'Mi Entrenamiento',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsDrawer"
        component={SettingsScreen}
        options={{
          title: 'Configuración',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}