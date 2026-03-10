import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { TabConfig } from '../types/tabConfig';
import CustomTabBar from '../components/bottomTabs/custom-tabBar';

// Placeholder screens
const EmptyScreen = () => null;

export type TabParamList = {
    home: undefined;
    myTrips: undefined;
    offers: undefined;
    driver: undefined;
    profile: undefined;
};

// ── Ionicons names matching screenshot icons exactly ──────────────────────────
const mainTabs: TabConfig[] = [
    {
        name: 'home',
        label: 'Home',
        icon: 'home', // filled house   — active orange
        iconOff: 'home-outline', // outline house  — inactive grey
    },
    {
        name: 'myTrips',
        label: 'My trips',
        icon: 'briefcase',
        iconOff: 'briefcase-outline',
    },
    {
        name: 'offers',
        label: 'offers',
        icon: 'cash', // center ₹ button — icon not rendered directly
        iconOff: 'cash-outline',
        center: true,
    },
    {
        name: 'driver',
        label: 'Driver',
        icon: 'car',
        iconOff: 'car-outline',
    },
    {
        name: 'profile',
        label: 'Profile',
        icon: 'person-circle',
        iconOff: 'person-circle-outline',
    },
];

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigation = () => (
    <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={props => <CustomTabBar {...props} tabs={mainTabs} />}
    >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="myTrips" component={EmptyScreen} />
        <Tab.Screen name="offers" component={EmptyScreen} />
        <Tab.Screen name="driver" component={EmptyScreen} />
        <Tab.Screen name="profile" component={EmptyScreen} />
    </Tab.Navigator>
);
