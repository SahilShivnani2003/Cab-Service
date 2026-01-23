import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/main';
import { Home } from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  );
}
