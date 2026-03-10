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

// ─── Theme Constants (matches HomeScreen) ──────────────────────────────────────
const ORANGE = '#F4651A';
const WHITE = '#FFFFFF';
const BGRAY = '#F2F2F2';
const DARK = '#1A1A1A';
const MGRAY = '#888888';
const BORDER = '#E0E0E0';
const NAV_BG = '#111111';
const GREEN = '#22C55E';
const RED = '#EF4444';

// ─── Types ─────────────────────────────────────────────────────────────────────
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

// ─── Driver Screen ─────────────────────────────────────────────────────────────
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
                {
                    icon: '📈',
                    label: 'Weekly Earnings',
                    route: 'WeeklyEarnings',
                    rightText: '₹12,500',
                },
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
                {
                    icon: '✅',
                    label: 'Background Check',
                    route: 'BackgroundCheck',
                    badge: 'Cleared',
                },
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
        <TouchableOpacity key={trip.id} style={s.tripCard} activeOpacity={0.75}>
            {/* Top row: avatar + name + fare */}
            <View style={s.tripTop}>
                <View style={s.passengerAvatar}>
                    <Text style={s.passengerInitial}>{trip.passenger[0]}</Text>
                </View>
                <View style={s.tripInfo}>
                    <Text style={s.passengerName}>{trip.passenger}</Text>
                    <Text style={s.tripTime}>{trip.time}</Text>
                </View>
                <View style={s.fareWrap}>
                    <Text style={s.fareAmt}>{trip.fare}</Text>
                    <View style={s.ratingBadge}>
                        <Text style={s.ratingTxt}>⭐ {trip.rating}</Text>
                    </View>
                </View>
            </View>

            {/* Route */}
            <View style={s.routeWrap}>
                <View style={s.routeRow}>
                    <View style={s.pickupDot} />
                    <Text style={s.routeTxt} numberOfLines={1}>
                        {trip.pickup}
                    </Text>
                </View>
                <View style={s.routeLine} />
                <View style={s.routeRow}>
                    <View style={s.dropDot} />
                    <Text style={s.routeTxt} numberOfLines={1}>
                        {trip.dropoff}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <View style={s.tripFooter}>
                <Text style={s.distanceTxt}>📍 {trip.distance}</Text>
                <TouchableOpacity style={s.detailBtn}>
                    <Text style={s.detailBtnTxt}>View Details</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={s.root}>
            <StatusBar backgroundColor={ORANGE} barStyle="light-content" />

            {/* ━━━ ORANGE HEADER ━━━ */}
            <View style={s.orangeHeader}>
                {/* Top bar */}
                <View style={s.topBar}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => navigation.goBack()}>
                        <Text style={s.iconBtnTxt}>←</Text>
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Driver Mode</Text>
                    <TouchableOpacity style={s.iconBtn}>
                        <Text style={s.hIcon}>🔔</Text>
                        <View style={s.badgeRed} />
                    </TouchableOpacity>
                </View>

                {/* Online / Offline toggle card */}
                <View style={s.statusCard}>
                    <View>
                        <Text style={s.statusLbl}>You are</Text>
                        <Text style={[s.statusVal, isOnline ? s.statusOn : s.statusOff]}>
                            {isOnline ? 'Online' : 'Offline'}
                        </Text>
                    </View>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#86EFAC' }}
                        thumbColor={isOnline ? GREEN : WHITE}
                        ios_backgroundColor="rgba(255,255,255,0.3)"
                        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                    />
                </View>
            </View>

            {/* ━━━ SCROLL BODY ━━━ */}
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Today's Stats */}
                <View style={s.section}>
                    <Text style={s.sectionTitle}>Today's Summary</Text>
                    <View style={s.statsGrid}>
                        {[
                            { ico: '💰', val: todayStats.earnings, lbl: 'Earnings' },
                            { ico: '🚗', val: String(todayStats.trips), lbl: 'Trips' },
                            { ico: '⏰', val: `${todayStats.hours}h`, lbl: 'Online' },
                            { ico: '⭐', val: todayStats.rating, lbl: 'Rating' },
                        ].map((st, i) => (
                            <View key={i} style={s.statCard}>
                                <Text style={s.statIco}>{st.ico}</Text>
                                <Text style={s.statVal}>{st.val}</Text>
                                <Text style={s.statLbl}>{st.lbl}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={s.section}>
                    <View style={s.quickGrid}>
                        {quickActions.map((a, i) => (
                            <TouchableOpacity
                                key={i}
                                style={s.quickCard}
                                activeOpacity={0.75}
                                onPress={() => a.route && navigation.navigate(a.route)}
                            >
                                <Text style={s.quickIco}>{a.icon}</Text>
                                <Text style={s.quickLbl}>{a.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recent Trips */}
                <View style={s.section}>
                    <View style={s.sectionRow}>
                        <Text style={s.sectionTitle}>Recent Trips</Text>
                        <TouchableOpacity>
                            <Text style={s.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    {recentTrips.map(t => renderTripCard(t))}
                </View>

                {/* Driver Menu Sections */}
                {driverMenu.map((sec, si) => (
                    <View key={si} style={s.section}>
                        <Text style={s.menuSecTitle}>{sec.title}</Text>
                        <View style={s.menuCard}>
                            {sec.items.map((item, ii) => (
                                <View key={ii}>
                                    <TouchableOpacity
                                        style={s.menuItem}
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            item.route && navigation.navigate(item.route)
                                        }
                                    >
                                        <View style={s.menuLeft}>
                                            <View style={s.menuIconBox}>
                                                <Text style={s.menuIcon}>{item.icon}</Text>
                                            </View>
                                            <Text style={s.menuLabel}>{item.label}</Text>
                                        </View>
                                        <View style={s.menuRight}>
                                            {item.badge && (
                                                <View style={s.menuBadge}>
                                                    <Text style={s.menuBadgeTxt}>{item.badge}</Text>
                                                </View>
                                            )}
                                            {item.rightText && (
                                                <Text style={s.menuRightTxt}>{item.rightText}</Text>
                                            )}
                                            <Text style={s.chevron}>›</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {ii < sec.items.length - 1 && <View style={s.menuDivider} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Emergency */}
                <TouchableOpacity style={s.emergencyBtn} activeOpacity={0.75}>
                    <Text style={s.emergencyIco}>🚨</Text>
                    <Text style={s.emergencyTxt}>Emergency Help</Text>
                </TouchableOpacity>

                <View style={{ height: 20 }} />
            </ScrollView>

            {/* ━━━ BOTTOM NAV ━━━ */}
            <View style={s.bottomNav}>
                <TouchableOpacity style={s.navItem}>
                    <Text style={s.navIco}>🏠</Text>
                    <Text style={s.navLbl}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.navItem}>
                    <Text style={s.navIco}>🧳</Text>
                    <Text style={s.navLbl}>My trips</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.navCenter}>
                    <View style={s.navCircle}>
                        <Text style={s.navCircleTxt}>₹</Text>
                    </View>
                    <Text style={s.navLbl}>offers</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.navItem}>
                    <Text style={[s.navIco, { color: ORANGE }]}>🚘</Text>
                    <Text style={[s.navLbl, { color: ORANGE }]}>Driver</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.navItem}>
                    <Text style={s.navIco}>👤</Text>
                    <Text style={s.navLbl}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: BGRAY },

    // ━━━ ORANGE HEADER ━━━
    orangeHeader: {
        backgroundColor: ORANGE,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 56 : 16,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 10,
        zIndex: 10,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    iconBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    iconBtnTxt: { color: WHITE, fontSize: 20, fontWeight: '700' },
    hIcon: { fontSize: 20 },
    badgeRed: {
        position: 'absolute',
        top: 7,
        right: 7,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: RED,
        borderWidth: 1.5,
        borderColor: ORANGE,
    },
    headerTitle: { color: WHITE, fontSize: 19, fontWeight: '800' },

    // Status card
    statusCard: {
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.28)',
    },
    statusLbl: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 },
    statusVal: { fontSize: 24, fontWeight: '800' },
    statusOn: { color: GREEN },
    statusOff: { color: WHITE },

    // ━━━ SCROLL ━━━
    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 14, paddingTop: 20, paddingBottom: 20 },

    // Section
    section: { marginBottom: 22 },
    sectionTitle: { fontSize: 17, fontWeight: '700', color: DARK, marginBottom: 14 },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    viewAll: { color: ORANGE, fontSize: 14, fontWeight: '600' },

    // Stats grid
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    statCard: {
        flex: 1,
        minWidth: '47%',
        backgroundColor: WHITE,
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    statIco: { fontSize: 30, marginBottom: 8 },
    statVal: { fontSize: 22, fontWeight: '800', color: DARK, marginBottom: 4 },
    statLbl: { fontSize: 12, color: MGRAY },

    // Quick actions
    quickGrid: { flexDirection: 'row', gap: 10 },
    quickCard: {
        flex: 1,
        backgroundColor: WHITE,
        borderRadius: 14,
        padding: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    quickIco: { fontSize: 26, marginBottom: 6 },
    quickLbl: { fontSize: 11, fontWeight: '600', color: DARK, textAlign: 'center' },

    // Trip card
    tripCard: {
        backgroundColor: WHITE,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    tripTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
    passengerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    passengerInitial: { color: WHITE, fontSize: 18, fontWeight: '800' },
    tripInfo: { flex: 1 },
    passengerName: { fontSize: 15, fontWeight: '700', color: DARK, marginBottom: 2 },
    tripTime: { fontSize: 12, color: MGRAY },
    fareWrap: { alignItems: 'flex-end' },
    fareAmt: { fontSize: 18, fontWeight: '800', color: GREEN, marginBottom: 4 },
    ratingBadge: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ratingTxt: { fontSize: 11, fontWeight: '600', color: '#A0530A' },

    routeWrap: { marginBottom: 12 },
    routeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    pickupDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: GREEN, marginRight: 10 },
    dropDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: RED, marginRight: 10 },
    routeLine: { width: 2, height: 14, backgroundColor: BORDER, marginLeft: 4, marginBottom: 6 },
    routeTxt: { flex: 1, fontSize: 13, color: '#4B5563' },

    tripFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: BORDER,
        paddingTop: 10,
    },
    distanceTxt: { fontSize: 13, color: MGRAY },
    detailBtn: {
        backgroundColor: '#FEF0E8',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 8,
    },
    detailBtnTxt: { color: ORANGE, fontSize: 13, fontWeight: '700' },

    // Menu sections
    menuSecTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: MGRAY,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 10,
    },
    menuCard: {
        backgroundColor: WHITE,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 14,
    },
    menuLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    menuIconBox: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#FEF0E8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuIcon: { fontSize: 18 },
    menuLabel: { fontSize: 15, color: DARK, fontWeight: '500', flex: 1 },
    menuRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    menuBadge: {
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    menuBadgeTxt: { fontSize: 11, fontWeight: '700', color: '#065F46' },
    menuRightTxt: { fontSize: 14, color: MGRAY, fontWeight: '600' },
    chevron: { fontSize: 26, color: BORDER },
    menuDivider: { height: 1, backgroundColor: BGRAY, marginLeft: 64 },

    // Emergency
    emergencyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        borderRadius: 14,
        paddingVertical: 16,
        borderWidth: 1.5,
        borderColor: '#FECACA',
        marginBottom: 4,
    },
    emergencyIco: { fontSize: 20, marginRight: 8 },
    emergencyTxt: { fontSize: 16, fontWeight: '700', color: RED },

    // ━━━ BOTTOM NAV ━━━
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: NAV_BG,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 22 : 10,
        alignItems: 'flex-end',
    },
    navItem: { flex: 1, alignItems: 'center', paddingTop: 4 },
    navIco: { fontSize: 22, color: MGRAY },
    navLbl: { fontSize: 10.5, color: MGRAY, marginTop: 3, fontWeight: '500' },
    navCenter: { flex: 1, alignItems: 'center', marginTop: -24 },
    navCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: NAV_BG,
        shadowColor: ORANGE,
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 10,
    },
    navCircleTxt: { fontSize: 26, fontWeight: '900', color: WHITE },
});
