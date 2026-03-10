import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Platform } from 'react-native';
import { TabConfig } from '../../types/tabConfig';
import CenterTab from './center-tab';
import RegularTab from './regular-tab';
import { Colors } from '../../theme/theme';

interface CustomTabBarProps {
    state: any;
    navigation: any;
    tabs: TabConfig[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CustomTabBar({ state, navigation, tabs }: CustomTabBarProps) {
    const [barWidth, setBarWidth] = useState(SCREEN_WIDTH);
    const tabWidth = barWidth / tabs.length;

    return (
        <View style={styles.tabContainer} onLayout={e => setBarWidth(e.nativeEvent.layout.width)}>
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
        flexDirection: 'row',
        backgroundColor: Colors.navBg,
        width: SCREEN_WIDTH,
        position: 'absolute',
        overflow: 'visible', // lets center circle overflow upward
        alignItems: 'flex-end', // regular tabs align to bar bottom
        bottom: 0,
        left: 0,
        right: 0,
        // iOS home indicator padding
        paddingBottom: Platform.OS === 'ios' ? 16 : 0,
        // Top shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 16,
    },
});
