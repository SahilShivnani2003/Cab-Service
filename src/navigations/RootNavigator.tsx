import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/splash-screen';
import { TabNavigation } from './TabNavigation';
import { NavigationContainer } from '@react-navigation/native';

export type RootParamList = {
    splash: undefined;
    main: undefined;
};
const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="splash" component={SplashScreen} />
                <Stack.Screen name="main" component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
