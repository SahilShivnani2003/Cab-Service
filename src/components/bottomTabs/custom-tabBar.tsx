import { Dimensions, StyleSheet, View } from 'react-native';
import { TabConfig } from '../../types/tabConfig';
import { useState } from 'react';
import CenterTab from './center-tab';
import RegularTab from './regular-tab';

interface CustomTabBarProps {
  state: any;
  navigation: any;
  tabs: TabConfig[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CustomTabBar({
  state,
  navigation,
  tabs,
}: CustomTabBarProps) {
  const [barWidth, setBarWidth] = useState(SCREEN_WIDTH - 32);
  const tabWidth = barWidth / tabs.length;

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const tab = tabs.find(t => t.name === route.name);
        if (!tab) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return tab.center ? (
          <CenterTab
            key={route.name}
            tab={tab}
            isFocused={isFocused}
            onPress={onPress}
            tabWidth={tabWidth}
          />
        ) : (
          <RegularTab
            key={route.name}
            tab={tab}
            isFocused={isFocused}
            onPress={onPress}
            tabWidth={tabWidth}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    width: SCREEN_WIDTH,
    position: 'absolute',
    overflow: 'visible',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
