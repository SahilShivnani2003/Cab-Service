import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Driver } from '../screens/Driver';
import { MyTrips } from '../screens/MyTrips';
import { Main } from '../screens/Main';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Driver" component={Driver}/>
      <Stack.Screen name="MyTrip" component={MyTrips}/>
    </Stack.Navigator>
  );
}
