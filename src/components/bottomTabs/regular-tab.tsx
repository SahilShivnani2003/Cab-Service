import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabConfig } from '../../types/tabConfig';
import { Colors, FontSize, FontWeight } from '../../theme/theme';

interface Props {
    tab: TabConfig;
    isFocused: boolean;
    onPress: () => void;
    tabWidth: number;
}

export default function RegularTab({ tab, isFocused, onPress, tabWidth }: Props) {
    const color = isFocused ? Colors.navActive : Colors.navInactive;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.wrap, { width: tabWidth }]}
        >
            <Ionicons name={isFocused ? tab.icon : tab.iconOff} size={24} color={color} />
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrap: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 8,
    },
    label: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
        marginTop: 3,
    },
});
