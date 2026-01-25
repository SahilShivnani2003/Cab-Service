import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Platform,
    Switch,
} from 'react-native';
import { AppLayout } from '../layouts/AppLayout';

type DriverMenuItem = {
    icon: string;
    label: string;
    route: string;
    badge?: string;
    rightText?: string;
};

type DriverMenuSection = {
    title: string;
    items: DriverMenuItem[];
};

export const Driver = ({ navigation }: any) => {
    const [isOnline, setIsOnline] = useState(false);

    const todayStats = {
        earnings: '₹2,450',
        trips: 12,
        hours: '5.5',
        rating: '4.9',
    };

    const recentTrips = [
        {
            id: 1,
            passenger: 'Rahul Sharma',
            pickup: 'Bhopal Railway Station',
            dropoff: 'MP Nagar',
            fare: '₹280',
            distance: '8.5 km',
            time: '2:30 PM',
            rating: 5,
            status: 'completed',
        },
        {
            id: 2,
            passenger: 'Priya Gupta',
            pickup: 'Airport',
            dropoff: 'Arera Colony',
            fare: '₹450',
            distance: '12.2 km',
            time: '1:15 PM',
            rating: 5,
            status: 'completed',
        },
        {
            id: 3,
            passenger: 'Amit Patel',
            pickup: 'DB Mall',
            dropoff: 'Ayodhya Bypass',
            fare: '₹320',
            distance: '9.8 km',
            time: '11:45 AM',
            rating: 4,
            status: 'completed',
        },
    ];

    const quickActions = [
        { icon: '📊', label: 'Earnings', route: 'Earnings' },
        { icon: '📍', label: 'Navigation', route: 'Navigation' },
        { icon: '📞', label: 'Support', route: 'Support' },
        { icon: '⚙️', label: 'Settings', route: 'Settings' },
    ];

    const driverMenu: DriverMenuSection[] = [
        {
            title: 'Performance',
            items: [
                { icon: '📈', label: 'Weekly Earnings', route: 'WeeklyEarnings', rightText: '₹12,500' },
                { icon: '⭐', label: 'Rating Details', route: 'RatingDetails', rightText: '4.9' },
                { icon: '🎯', label: 'Acceptance Rate', route: 'AcceptanceRate', rightText: '92%' },
                { icon: '⏱️', label: 'Online Hours', route: 'OnlineHours', rightText: '32h' },
            ],
        },
        {
            title: 'Documents',
            items: [
                { icon: '🚗', label: 'Vehicle Documents', route: 'VehicleDocs', badge: 'Verified' },
                { icon: '📄', label: 'License', route: 'License', badge: 'Valid' },
                { icon: '🛡️', label: 'Insurance', route: 'Insurance', badge: 'Active' },
                { icon: '✅', label: 'Background Check', route: 'BackgroundCheck', badge: 'Cleared' },
            ],
        },
        {
            title: 'Account',
            items: [
                { icon: '💰', label: 'Payment Methods', route: 'PaymentMethods' },
                { icon: '📋', label: 'Trip History', route: 'TripHistory' },
                { icon: '🎁', label: 'Referrals', route: 'Referrals', rightText: 'Earn ₹500' },
                { icon: '📚', label: 'Training', route: 'Training' },
            ],
        },
    ];


    const renderTripCard = (trip: any) => (
        <TouchableOpacity key={trip.id} style={styles.tripCard} activeOpacity={0.7}>
            <View style={styles.tripHeader}>
                <View style={styles.tripHeaderLeft}>
                    <View style={styles.passengerAvatar}>
                        <Text style={styles.passengerInitial}>{trip.passenger[0]}</Text>
                    </View>
                    <View style={styles.tripHeaderInfo}>
                        <Text style={styles.passengerName}>{trip.passenger}</Text>
                        <Text style={styles.tripTime}>{trip.time}</Text>
                    </View>
                </View>
                <View style={styles.fareContainer}>
                    <Text style={styles.fareAmount}>{trip.fare}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>⭐ {trip.rating}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.tripRoute}>
                <View style={styles.routeItem}>
                    <View style={styles.pickupDot} />
                    <Text style={styles.routeText} numberOfLines={1}>{trip.pickup}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routeItem}>
                    <View style={styles.dropoffDot} />
                    <Text style={styles.routeText} numberOfLines={1}>{trip.dropoff}</Text>
                </View>
            </View>

            <View style={styles.tripFooter}>
                <Text style={styles.tripDistance}>📍 {trip.distance}</Text>
                <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <AppLayout>
            <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Driver Mode</Text>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Text style={styles.notificationIcon}>🔔</Text>
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                </View>

                {/* Online Status Toggle */}
                <View style={styles.statusCard}>
                    <View style={styles.statusLeft}>
                        <Text style={styles.statusLabel}>You are</Text>
                        <Text style={[styles.statusText, isOnline ? styles.statusOnline : styles.statusOffline]}>
                            {isOnline ? 'Online' : 'Offline'}
                        </Text>
                    </View>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                        thumbColor={isOnline ? '#10B981' : '#F3F4F6'}
                        ios_backgroundColor="#D1D5DB"
                        style={styles.statusSwitch}
                    />
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Today's Stats */}
                <View style={styles.statsContainer}>
                    <Text style={styles.sectionTitle}>Today's Summary</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>💰</Text>
                            <Text style={styles.statValue}>{todayStats.earnings}</Text>
                            <Text style={styles.statLabel}>Earnings</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>🚗</Text>
                            <Text style={styles.statValue}>{todayStats.trips}</Text>
                            <Text style={styles.statLabel}>Trips</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>⏰</Text>
                            <Text style={styles.statValue}>{todayStats.hours}h</Text>
                            <Text style={styles.statLabel}>Online</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>⭐</Text>
                            <Text style={styles.statValue}>{todayStats.rating}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <View style={styles.quickActionsGrid}>
                        {quickActions.map((action, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.quickActionCard}
                                activeOpacity={0.7}
                                onPress={() => action.route && navigation.navigate(action.route)}
                            >
                                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                                <Text style={styles.quickActionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recent Trips */}
                <View style={styles.recentTripsContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Trips</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    {recentTrips.map(trip => renderTripCard(trip))}
                </View>

                {/* Driver Menu */}
                {driverMenu.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.menuSection}>
                        <Text style={styles.menuSectionTitle}>{section.title}</Text>
                        <View style={styles.menuCard}>
                            {section.items.map((item, itemIndex) => (
                                <View key={itemIndex}>
                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        activeOpacity={0.7}
                                        onPress={() => item.route && navigation.navigate(item.route)}
                                    >
                                        <View style={styles.menuItemLeft}>
                                            <View style={styles.menuIconContainer}>
                                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                            </View>
                                            <Text style={styles.menuLabel}>{item.label}</Text>
                                        </View>
                                        <View style={styles.menuItemRight}>
                                            {item.badge && (
                                                <View style={[styles.menuBadge, item.badge === 'Verified' || item.badge === 'Valid' || item.badge === 'Active' || item.badge === 'Cleared' ? styles.menuBadgeGreen : {}]}>
                                                    <Text style={styles.menuBadgeText}>{item.badge}</Text>
                                                </View>
                                            )}
                                            {item.rightText && (
                                                <Text style={styles.menuRightText}>{item.rightText}</Text>
                                            )}
                                            <Text style={styles.menuChevron}>›</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {itemIndex < section.items.length - 1 && (
                                        <View style={styles.menuDivider} />
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Emergency Button */}
                <TouchableOpacity style={styles.emergencyButton} activeOpacity={0.7}>
                    <Text style={styles.emergencyIcon}>🚨</Text>
                    <Text style={styles.emergencyText}>Emergency Help</Text>
                </TouchableOpacity>

                {/* Extra padding for bottom nav */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        backgroundColor: '#2563EB',
        paddingTop: Platform.OS === 'ios' ? 60 : 48,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    notificationIcon: {
        fontSize: 20,
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
    },
    statusCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    statusLeft: {},
    statusLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        marginBottom: 4,
    },
    statusText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusOnline: {
        color: '#10B981',
    },
    statusOffline: {
        color: '#FFFFFF',
    },
    statusSwitch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    statsContainer: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        flex: 1,
        minWidth: '47%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    statIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    quickActionsContainer: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    quickActionCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    quickActionIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    quickActionLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#1F2937',
        textAlign: 'center',
    },
    recentTripsContainer: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewAllText: {
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '600',
    },
    tripCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    tripHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    tripHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    passengerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    passengerInitial: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tripHeaderInfo: {},
    passengerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    tripTime: {
        fontSize: 12,
        color: '#6B7280',
    },
    fareContainer: {
        alignItems: 'flex-end',
    },
    fareAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#10B981',
        marginBottom: 4,
    },
    ratingBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#92400E',
    },
    tripRoute: {
        marginBottom: 12,
    },
    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    pickupDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#10B981',
        marginRight: 12,
    },
    dropoffDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EF4444',
        marginRight: 12,
    },
    routeLine: {
        width: 2,
        height: 16,
        backgroundColor: '#E5E7EB',
        marginLeft: 4,
        marginBottom: 8,
    },
    routeText: {
        flex: 1,
        fontSize: 14,
        color: '#4B5563',
    },
    tripFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 12,
    },
    tripDistance: {
        fontSize: 13,
        color: '#6B7280',
    },
    viewDetailsButton: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    viewDetailsText: {
        color: '#2563EB',
        fontSize: 13,
        fontWeight: '600',
    },
    menuSection: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    menuSectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6B7280',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuIcon: {
        fontSize: 20,
    },
    menuLabel: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
        flex: 1,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    menuBadge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    menuBadgeGreen: {
        backgroundColor: '#D1FAE5',
    },
    menuBadgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#991B1B',
    },
    menuRightText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    menuChevron: {
        fontSize: 28,
        color: '#D1D5DB',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginLeft: 68,
    },
    emergencyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        marginHorizontal: 20,
        marginTop: 24,
        borderRadius: 16,
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: '#FECACA',
    },
    emergencyIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    emergencyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#DC2626',
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
});