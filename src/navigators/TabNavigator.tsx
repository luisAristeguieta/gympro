import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigators() {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {

            let iconName: any = 'list';

            if(route.name === 'ProgressTab'){
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }else if(route.name === 'RoutineTab'){
                iconName = focused ? 'barbell' : 'barbell-outline';
            }
            return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray'
    })}>

            <Tab.Screen name="ProgressTab" component={ProgressScreen} options={{ title: "Progreso" }} />
            <Tab.Screen name="RoutineTab" component={RoutineListScreen} options={{ title: "Rutina", headerShown: true }} />
        </Tab.Navigator>
    );
}