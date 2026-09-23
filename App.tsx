import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import ChestDetailScreen from './src/screens/RoutineDetailScreen';
import DrawerNavigators from './src/navigators/DrawerNavigator';
import { RoutineProvider } from './src/context/RoutineContext';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from './src/screens/AddRoutineScreen';

export type RootStackParamList = {
  MainDraw: undefined;
  ChestDetail: undefined;
  RoutineDetail: { routineId: string };
  AddRoutine: { routineId?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <RoutineProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainDraw">
            <Stack.Screen
              name="MainDraw"
              component={DrawerNavigators}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RoutineDetail"
              component={RoutineDetailScreen}
              options={{
                title: 'Detalle de Rutina',
              }}
            />

            <Stack.Screen
            name="AddRoutine"
            component={AddRoutineScreen}
            options={({ route }) => ({
              title: route.params?.routineId ? 'Editar Rutina' : 'Nueva Rutina',
            })}
          />


          </Stack.Navigator>
        </NavigationContainer>
      </RoutineProvider >
    </>
  );
}