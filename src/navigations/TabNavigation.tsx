import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { MyTrips } from '../screens/MyTrips';
import { Main } from '../screens/Main';
import { Driver } from '../screens/Driver';
import { Profile } from '../screens/Profile';
import { TabConfig } from '../types/tabConfig';
import CustomTabBar from '../components/bottomTabs/custom-tabBar';

export type tabParamList = {
  home: undefined;
  myTrips: undefined;
  offers: undefined;
  driver: undefined;
  profile: undefined;
};

const mainTabs: TabConfig[] = [
  {
    name: 'home',
    label: 'Home',
    icon: 'grid',
    iconOff: 'grid-outline',
  },
  {
    name: 'myTrips',
    label: 'My Trips',
    icon: 'grid',
    iconOff: 'grid-outline',
  },
  {
    name: 'offers',
    label: 'Offers',
    icon: 'grid',
    iconOff: 'grid-outline',
    center: true,
  },
  {
    name: 'driver',
    label: 'Driver',
    icon: 'grid',
    iconOff: 'grid-outline',
  },
  {
    name: 'profile',
    label: 'Profile',
    icon: 'grid',
    iconOff: 'grid-outline',
  },
];

const Tab = createBottomTabNavigator<tabParamList>();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} tabs={mainTabs} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="myTrips" component={MyTrips} />
      <Tab.Screen name="offers" component={Main} />
      <Tab.Screen name="driver" component={Driver} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};
