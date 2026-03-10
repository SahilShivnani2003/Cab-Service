import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { TabConfig } from '../../types/tabConfig';
import { Colors, FontSize, FontWeight, Shadow } from '../../theme/theme';

interface Props {
    tab: TabConfig;
    isFocused: boolean;
    onPress: () => void;
    tabWidth: number;
}

export default function CenterTab({ tab, isFocused, onPress, tabWidth }: Props) {
    const labelColor = isFocused ? Colors.navActive : Colors.navInactive;

    return (
        <View style={[styles.outer, { width: tabWidth }]}>
            {/* Circle floats above the bar */}
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.circle}>
                <Text style={styles.rupee}>₹</Text>
            </TouchableOpacity>
            <Text style={[styles.label, { color: labelColor }]}>{tab.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    outer: {
        alignItems: 'center',
        // Pull the whole thing upward so the circle overflows above the bar
        marginTop: -26,
        paddingBottom: 8,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        // Dark ring matching the nav bg — looks like a border gap in screenshot
        borderWidth: 3,
        borderColor: Colors.navBg,
        marginBottom: 4,
        ...Shadow.centerBtn,
    },
    rupee: {
        color: Colors.white,
        fontSize: 28,
        fontWeight: FontWeight.bold,
        // ₹ glyph sits slightly low in some fonts
        lineHeight: 34,
    },
    label: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
    },
});
