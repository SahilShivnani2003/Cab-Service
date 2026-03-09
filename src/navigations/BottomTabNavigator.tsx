import react from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Driver } from '../screens/Driver';
import { MyTrips } from '../screens/MyTrips';
import { Offer } from '../screens/Offer';
import { Colors } from '../common/Typography';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Colors.black, // Dark background from image
          height: 70,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Driver') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'MyTrip') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Offer') {
            iconName = focused ? 'rupee' : 'rupee-outline';
          };

          // You can return any component that you like here!
          return <Ionicons name={iconName as any} size={size} color={color} />
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.white,
        headerShown: false, // Hides the main header, stacks will manage their own
      })}
    >
      {/* <BottomTab.Screen name="Main" component={Main} /> */}
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="MyTrip" component={MyTrips} />
      <BottomTab.Screen name="Offer" component={Offer} />
      <BottomTab.Screen name="Driver" component={Driver} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
}
