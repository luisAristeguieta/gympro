import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import ChestDetailScreen from './src/screens/ChestDetailScreen';
import DrawerNavigators from './src/navigators/DrawerNavigator';

export type RootStackParamList = {
  MainDraw: undefined;
  ChestDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainDraw">
          <Stack.Screen
            name="MainDraw"
            component={DrawerNavigators}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChestDetail"
            component={ChestDetailScreen}
            options={{
              title: 'Rutina de Pecho',
              headerShown: true,
              headerStyle: { backgroundColor: '#1E1E1E' },
              headerTintColor: '#FF6B00',
              headerTitleStyle: { color: '#FFFFFF' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}