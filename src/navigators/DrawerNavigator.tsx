import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigators() {
    return (
        <Drawer.Navigator initialRouteName="TrainingDrawer" screenOptions={{ headerShown: true }}>
            <Drawer.Screen name='TrainingDrawer' component={TabNavigator} options={{ 
          title: 'Mi Entrenamiento',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={size} color={color} />
          ),
        }} 
      />
            <Drawer.Screen name="SettingsDrawer" component={SettingsScreen} options={{ 
          title: 'Configuración',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }} 
      />
        </Drawer.Navigator>
    );
}
