import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    Platform,
    Dimensions,
} from 'react-native';

// ─── Types ─────────────────────────────────────────────────────────────────────
type TripType = 'round' | 'one';
type NavId = 'home' | 'trips' | 'offers' | 'driver' | 'profile';

interface ServiceItem {
    id: number;
    label: string;
    emoji: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const ORANGE = '#F4651A';
const WHITE = '#FFFFFF';
const BGRAY = '#F2F2F2';
const BORDER = '#E0E0E0';
const DARK = '#1A1A1A';
const MGRAY = '#888888';
const LGRAY = '#CCCCCC';
const BLUE = '#4A90D9';
const { width: SW } = Dimensions.get('window');
const CARD_H = 100;

// ─── Data ───────────────────────────────────────────────────────────────────────
const ROW1: ServiceItem[] = [
    { id: 1, label: 'AirPlane', emoji: '✈️' },
    { id: 2, label: 'Railway', emoji: '🚆' },
    { id: 3, label: 'Outstation', emoji: '🚉' },
    { id: 4, label: 'Hourly\nRentals', emoji: '🚌' },
];

const ROW2: ServiceItem[] = [
    { id: 5, label: 'Hourly Stay', emoji: '🛋️' },
    { id: 6, label: 'Holtels', emoji: '🛏️' },
    { id: 7, label: 'Holiday Packages', emoji: '🏖️' },
    { id: 8, label: 'Cabs', emoji: '🚗' },
];

// ─── Row 1 Card (spans orange header → white bg) ────────────────────────────────
const Row1Card: React.FC<{ item: ServiceItem }> = ({ item }) => (
    <View style={s.r1Wrap}>
        <View style={s.r1Card}>
            <Text style={s.r1Emoji}>{item.emoji}</Text>
        </View>
        <Text style={s.r1Label}>{item.label}</Text>
    </View>
);

// ─── Row 2 Icon (flat, no card) ─────────────────────────────────────────────────
const Row2Icon: React.FC<{ item: ServiceItem }> = ({ item }) => (
    <View style={s.r2Wrap}>
        <Text style={s.r2Emoji}>{item.emoji}</Text>
        <Text style={s.r2Label}>{item.label}</Text>
    </View>
);

// ─── HomeScreen ─────────────────────────────────────────────────────────────────
const HomeScreen: React.FC = () => {
    const [tripType, setTripType] = useState<TripType>('round');
    const [fromLoc, setFromLoc] = useState<string>('Bhopal, Madhya Pradesh, India');
    const [toLoc, setToLoc] = useState<string>('Indore, Madhya Pradesh, India');
    const [activeNav, setActiveNav] = useState<NavId>('home');

    return (
        <SafeAreaView style={s.root}>
            <StatusBar backgroundColor={ORANGE} barStyle="light-content" />

            {/* ━━━ ORANGE HEADER ━━━ */}
            <View style={s.header}>
                <View style={s.hLeft}>
                    <View style={s.avatarWrap}>
                        <View style={s.avatar}>
                            <Text style={s.avatarTxt}>NS</Text>
                        </View>
                        <View style={s.menuChip}>
                            <Text style={s.menuChipTxt}>☰</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={s.welcomeTxt}>Welcome Neeraj Saini</Text>
                        <View style={s.locRow}>
                            <Text style={s.locPin}>📍</Text>
                            <Text style={s.locTxt}> Bhopal</Text>
                        </View>
                    </View>
                </View>

                <View style={s.hRight}>
                    <TouchableOpacity style={{ marginRight: 16 }}>
                        <View>
                            <Text style={s.hIcon}>🪙</Text>
                            <View style={s.badge0}>
                                <Text style={s.badge0Txt}>₹0</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <Text style={s.hIcon}>🔔</Text>
                            <View style={s.badgeRed} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ━━━ ROW 1 CARDS (straddle orange / white boundary) ━━━ */}
            <View style={s.row1Section}>
                <View style={s.row1Orange} />
                <View style={s.row1White} />
                <View style={s.row1Cards}>
                    {ROW1.map(item => (
                        <Row1Card key={item.id} item={item} />
                    ))}
                </View>
            </View>

            {/* ━━━ SCROLLABLE BODY ━━━ */}
            <ScrollView
                style={s.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
            >
                <View style={s.middleSection}>
                    {/* Row 2 services */}
                    <View style={s.row2Section}>
                        {ROW2.map(item => (
                            <Row2Icon key={item.id} item={item} />
                        ))}
                    </View>

                    {/* Search bar */}
                    <View style={s.searchBar}>
                        <Text style={s.searchIco}>🔍</Text>
                        <TextInput style={s.searchInput} placeholderTextColor={LGRAY} />
                    </View>
                </View>

                {/* Booking card */}
                <View style={s.card}>
                    {/* Round trip / One way toggle */}
                    <View style={s.toggleRow}>
                        <TouchableOpacity
                            style={[s.toggleBtn, tripType === 'round' ? s.tActive : s.tInactive]}
                            onPress={() => setTripType('round')}
                        >
                            <Text
                                style={[
                                    s.toggleTxt,
                                    tripType === 'round' ? s.tActiveTxt : s.tInactiveTxt,
                                ]}
                            >
                                Round trip
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[s.toggleBtn, tripType === 'one' ? s.tActive : s.tInactive]}
                            onPress={() => setTripType('one')}
                        >
                            <Text
                                style={[
                                    s.toggleTxt,
                                    tripType === 'one' ? s.tActiveTxt : s.tInactiveTxt,
                                ]}
                            >
                                One way
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Route with connector */}
                    <View style={s.routeRow}>
                        {/* Dot-line-dot connector */}
                        <View style={s.connector}>
                            <View style={s.dotGray} />
                            <View style={s.connLine} />
                            <View style={s.dotDark} />
                        </View>

                        {/* From / To inputs */}
                        <View style={{ flex: 1 }}>
                            <Text style={s.fieldLbl}>From (Area, Street or Landmark)</Text>
                            <View style={s.fieldBox}>
                                <TextInput
                                    style={s.fieldTxt}
                                    value={fromLoc}
                                    onChangeText={setFromLoc}
                                />
                            </View>

                            <Text style={[s.fieldLbl, { marginTop: 14 }]}>
                                To (Area, Street or Landmark)
                            </Text>
                            <View style={s.fieldBox}>
                                <TextInput
                                    style={s.fieldTxt}
                                    value={toLoc}
                                    onChangeText={setToLoc}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Divider */}
                    <View style={s.divider} />

                    {/* Trip Start */}
                    <Text style={s.tripLbl}>TRIP START</Text>
                    <Text style={s.tripDate}>Mon, 9 Mar 2026 at 6:39 PM</Text>

                    {/* CTA */}
                    <TouchableOpacity style={s.ctaBtn} activeOpacity={0.85}>
                        <Text style={s.ctaTxt}>Search</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* ━━━ BOTTOM NAV ━━━ */}
            <View style={s.bottomNav}>
                {/* Home */}
                <TouchableOpacity style={s.navItem} onPress={() => setActiveNav('home')}>
                    <Text style={[s.navIco, activeNav === 'home' && s.navIcoOn]}>⌂</Text>
                    <Text style={[s.navLbl, activeNav === 'home' && s.navLblOn]}>Home</Text>
                </TouchableOpacity>

                {/* My trips */}
                <TouchableOpacity style={s.navItem} onPress={() => setActiveNav('trips')}>
                    <Text style={[s.navIco, activeNav === 'trips' && s.navIcoOn]}>🧳</Text>
                    <Text style={[s.navLbl, activeNav === 'trips' && s.navLblOn]}>My trips</Text>
                </TouchableOpacity>

                {/* Offers — floating center button */}
                <TouchableOpacity style={s.navCenter} onPress={() => setActiveNav('offers')}>
                    <View style={s.navCircle}>
                        <Text style={s.navCircleTxt}>₹</Text>
                    </View>
                    <Text style={s.navLbl}>offers</Text>
                </TouchableOpacity>

                {/* Driver */}
                <TouchableOpacity style={s.navItem} onPress={() => setActiveNav('driver')}>
                    <Text style={[s.navIco, activeNav === 'driver' && s.navIcoOn]}>🚘</Text>
                    <Text style={[s.navLbl, activeNav === 'driver' && s.navLblOn]}>Driver</Text>
                </TouchableOpacity>

                {/* Profile */}
                <TouchableOpacity style={s.navItem} onPress={() => setActiveNav('profile')}>
                    <Text style={[s.navIco, activeNav === 'profile' && s.navIcoOn]}>👤</Text>
                    <Text style={[s.navLbl, activeNav === 'profile' && s.navLblOn]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: BGRAY },

    // ── Header ──
    header: {
        backgroundColor: ORANGE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 10,
    },
    hLeft: { flexDirection: 'row', alignItems: 'center' },
    avatarWrap: { width: 56, height: 56, position: 'relative' },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarTxt: { fontSize: 20, fontWeight: '800', color: ORANGE },
    menuChip: {
        position: 'absolute',
        bottom: -2,
        right: -4,
        backgroundColor: '#2C2C2C',
        borderRadius: 7,
        width: 22,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuChipTxt: { color: WHITE, fontSize: 9, fontWeight: '700' },
    welcomeTxt: { color: WHITE, fontSize: 16, fontWeight: '700' },
    locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    locPin: { fontSize: 12 },
    locTxt: { color: WHITE, fontSize: 13, fontWeight: '500' },
    hRight: { flexDirection: 'row', alignItems: 'center' },
    hIcon: { fontSize: 26 },
    badge0: {
        position: 'absolute',
        top: -5,
        right: -14,
        backgroundColor: '#FFD700',
        borderRadius: 6,
        paddingHorizontal: 3,
        paddingVertical: 1,
    },
    badge0Txt: { fontSize: 8, fontWeight: '800', color: '#333' },
    badgeRed: {
        position: 'absolute',
        top: 1,
        right: 1,
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: '#FF3B30',
        borderWidth: 1.5,
        borderColor: ORANGE,
    },

    // ── Row 1 (overlapping cards) ──
    row1Section: {
        height: CARD_H + 40,
        position: 'relative',
    },
    row1Orange: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: CARD_H / 2 + 6,
        backgroundColor: ORANGE,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    row1White: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: CARD_H / 2 + 40,
        backgroundColor: WHITE,
    },
    row1Cards: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    r1Wrap: { alignItems: 'center', width: (SW - 40) / 4 },
    r1Card: {
        width: 74,
        height: CARD_H,
        backgroundColor: WHITE,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 6,
    },
    r1Emoji: { fontSize: 34 },
    r1Label: {
        marginTop: 7,
        fontSize: 11.5,
        color: DARK,
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 15,
    },

    // ── Row 2 ──
    row2Section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: WHITE,
        marginBottom: 10,
    },
    middleSection: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: WHITE,
        marginBottom: 10,
    },
    r2Wrap: { alignItems: 'center', width: (SW - 32) / 4 },
    r2Emoji: { fontSize: 38 },
    r2Label: {
        marginTop: 6,
        fontSize: 11.5,
        color: DARK,
        textAlign: 'center',
        fontWeight: '500',
    },

    // ── Search bar ──
    searchBar: {
        backgroundColor: WHITE,
        marginHorizontal: 12,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BORDER,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 13 : 4,
    },
    searchIco: { fontSize: 17, color: MGRAY, marginRight: 8 },
    searchInput: { flex: 1, fontSize: 15, color: DARK },

    // ── Booking card ──
    card: {
        backgroundColor: WHITE,
        marginHorizontal: 12,
        borderRadius: 14,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 16,
    },

    // Toggle
    toggleRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
    toggleBtn: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 8,
        alignItems: 'center',
    },
    tActive: { borderWidth: 1.5, borderColor: BLUE, backgroundColor: WHITE },
    tInactive: { backgroundColor: '#EFEFEF' },
    toggleTxt: { fontSize: 14, fontWeight: '600' },
    tActiveTxt: { color: BLUE },
    tInactiveTxt: { color: '#555' },

    // Route connector
    routeRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
    connector: {
        alignItems: 'center',
        marginRight: 10,
        marginTop: 28,
        width: 12,
    },
    dotGray: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: '#C0C0C0',
        borderWidth: 1.5,
        borderColor: '#999',
    },
    connLine: {
        width: 2,
        height: 58,
        backgroundColor: '#DEDEDE',
        marginVertical: 3,
    },
    dotDark: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: '#444',
    },

    // Fields
    fieldLbl: { fontSize: 12, color: '#999', marginBottom: 5 },
    fieldBox: {
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 11 : 4,
        backgroundColor: WHITE,
    },
    fieldTxt: { fontSize: 14, fontWeight: '700', color: DARK },

    // Divider + trip start
    divider: { height: 1, backgroundColor: '#EBEBEB', marginVertical: 14 },
    tripLbl: {
        fontSize: 11,
        color: MGRAY,
        fontWeight: '600',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    tripDate: {
        fontSize: 18,
        fontWeight: '800',
        color: DARK,
        marginTop: 5,
        marginBottom: 18,
    },

    // CTA
    ctaBtn: {
        backgroundColor: ORANGE,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: ORANGE,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    ctaTxt: { color: WHITE, fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },

    // Scroll
    scroll: { flex: 1, backgroundColor: BGRAY },
    scrollContent: { paddingBottom: 10 },

    // ── Bottom Nav ──
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#111111',
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 22 : 10,
        alignItems: 'flex-end',
    },
    navItem: { flex: 1, alignItems: 'center', paddingTop: 4 },
    navIco: { fontSize: 22, color: MGRAY },
    navIcoOn: { color: ORANGE },
    navLbl: { fontSize: 10.5, color: MGRAY, marginTop: 3, fontWeight: '500' },
    navLblOn: { color: ORANGE },
    navCenter: { flex: 1, alignItems: 'center', marginTop: -24 },
    navCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#111111',
        shadowColor: ORANGE,
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 10,
    },
    navCircleTxt: { fontSize: 26, fontWeight: '900', color: WHITE },
});
