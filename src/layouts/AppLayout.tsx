import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

type AppLayoutProps = {
    children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {children}
            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Home' as never)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.navIcon}>🏠</Text>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('MyTrip' as never)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.navIcon}>🎫</Text>
                    <Text style={styles.navText}>My Trips</Text>
                </TouchableOpacity>

                <View style={styles.navItemCenter}>
                    <TouchableOpacity
                        style={styles.centerNavButton}
                        onPress={() => navigation.navigate('Offers' as never)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.centerNavIcon}>💰</Text>
                    </TouchableOpacity>
                    <Text style={styles.navText}>Offers</Text>
                </View>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Driver' as never)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.navIcon}>🚗</Text>
                    <Text style={styles.navText}>Driver</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Profile' as never)}
                >
                    <Text style={styles.navIcon}>👤</Text>
                    <Text style={styles.navTextActive}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    centerNavButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        marginBottom: 4,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingVertical: 8,
        paddingHorizontal: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    navItemCenter: {
        flex: 1,
        alignItems: 'center',
        marginTop: -32,
    },
    centerNavIcon: {
        fontSize: 28,
    },
    navIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    navText: {
        fontSize: 10,
        color: '#9CA3AF',
    },
    navTextActive: {
        fontSize: 10,
        color: '#2563EB',
        fontWeight: '600',
    },
})