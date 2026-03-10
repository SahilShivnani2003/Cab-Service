import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PRIMARY = '#FF6600';
const SB_H = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

const ROW1 = [
    { emoji: '✈️', label: 'AirPlane' },
    { emoji: '🚆', label: 'Railway' },
    { emoji: '🚃', label: 'Outstation' },
    { emoji: '🚌', label: 'Hourly\nRentals' },
];
const ROW2 = [
    { emoji: '👨‍💻', label: 'Hourly Stay' },
    { emoji: '🛏️', label: 'Holtels' },
    { emoji: '🏖️', label: 'Holiday\nPackages' },
    { emoji: '🚕', label: 'Cabs' },
];

export const Home = ({ navigation }: any) => {
    const [trip, setTrip] = useState<'round' | 'one'>('round');
    const [from, setFrom] = useState('Bhopal, Madhya Pradesh, India');
    const [to, setTo] = useState('Indore, Madhya Pradesh, India');

    return (
        <View style={s.root}>
            <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />

            {/* ── ORANGE HEADER (fixed, not scrollable) ── */}
            <View style={s.header}>
                <View style={s.topBar}>
                    {/* Avatar */}
                    <View style={s.avatarWrap}>
                        <View style={s.avatarCircle}>
                            <Text style={s.avatarTxt}>NS</Text>
                        </View>
                        <View style={s.hamburger}>
                            <Ionicons name="menu" size={12} color="#fff" />
                        </View>
                    </View>
                    {/* Name + Location */}
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={s.welcomeTxt}>Welcome Neeraj Saini</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                            <Ionicons name="location-sharp" size={13} color="#fff" />
                            <Text style={s.locTxt}> Bhopal</Text>
                        </View>
                    </View>
                    {/* Cart */}
                    <TouchableOpacity style={s.iconBtn}>
                        <Ionicons name="cart-outline" size={22} color="#fff" />
                        <View style={s.cartBadge}>
                            <Text style={s.cartTxt}>0</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Bell */}
                    <TouchableOpacity style={[s.iconBtn, { marginLeft: 10 }]}>
                        <Ionicons name="notifications-outline" size={22} color="#fff" />
                        <View style={s.bellDot} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── WHITE SERVICE SECTION overlapping header ── */}
            {/* position: absolute + top = header height  */}
            {/* This makes cards sit half on orange, half on white */}
            <View style={s.serviceSection}>
                {/* Row 1 */}
                <View style={s.row1}>
                    {ROW1.map((item, i) => (
                        <TouchableOpacity key={i} style={s.r1Item} activeOpacity={0.75}>
                            <View style={s.r1Card}>
                                <Text style={s.r1Emoji}>{item.emoji}</Text>
                            </View>
                            <Text style={s.r1Label}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* Row 2 */}
                <View style={s.row2}>
                    {ROW2.map((item, i) => (
                        <TouchableOpacity key={i} style={s.r2Item} activeOpacity={0.75}>
                            <Text style={s.r2Emoji}>{item.emoji}</Text>
                            <Text style={s.r2Label}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* ── SCROLLABLE GREY AREA ── */}
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Search bar */}
                <View style={s.searchBar}>
                    <Ionicons name="search-outline" size={20} color="#aaa" />
                    <TextInput style={s.searchInput} placeholderTextColor="#aaa" />
                </View>

                {/* Booking card */}
                <View style={s.card}>
                    {/* Toggle */}
                    <View style={s.toggleRow}>
                        <TouchableOpacity
                            onPress={() => setTrip('round')}
                            style={[s.toggleBtn, trip === 'round' && s.toggleActive]}
                        >
                            <Text style={[s.toggleTxt, trip === 'round' && s.toggleTxtActive]}>
                                Round trip
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTrip('one')}
                            style={[s.toggleBtn, trip === 'one' && s.toggleActive]}
                        >
                            <Text style={[s.toggleTxt, trip === 'one' && s.toggleTxtActive]}>
                                One way
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* FROM */}
                    <View style={s.fieldRow}>
                        <View style={s.bulletCol}>
                            <View style={s.bullet} />
                            <View style={s.vLine} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={s.hint}>From (Area, Street or Landmark)</Text>
                            <View style={s.inputBox}>
                                <TextInput
                                    value={from}
                                    onChangeText={setFrom}
                                    style={s.inputTxt}
                                    selectionColor={PRIMARY}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 14 }} />

                    {/* TO */}
                    <View style={s.fieldRow}>
                        <View style={s.bulletCol}>
                            <View style={s.bullet} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={s.hint}>To (Area, Street or Landmark)</Text>
                            <View style={s.inputBox}>
                                <TextInput
                                    value={to}
                                    onChangeText={setTo}
                                    style={s.inputTxt}
                                    selectionColor={PRIMARY}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 28 }} />
                    <View style={s.divider} />

                    {/* Trip Start */}
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={s.tripLabel}>TRIP START</Text>
                        <Text style={s.tripValue}>Mon, 9 Mar 2026 at 6:39 PM</Text>
                    </View>
                    <View style={s.divider} />

                    {/* Search Button */}
                    <TouchableOpacity style={s.searchBtn}>
                        <Text style={s.searchBtnTxt}>Search</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

// Header height = statusbar + topbar content
const HEADER_H = SB_H + (Platform.OS === 'ios' ? 50 : 10) + 80;
// How much of card appears on orange (top half of card)
const OVERLAP = 55;

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F0F0F0' },

    /* Orange header — exact height, no extra paddingBottom */
    header: {
        backgroundColor: PRIMARY,
        paddingTop: Platform.OS === 'ios' ? 50 : SB_H + 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    topBar: { flexDirection: 'row', alignItems: 'center' },

    avatarWrap: { width: 54, height: 54, position: 'relative' },
    avatarCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 2.5,
        borderColor: 'rgba(255,255,255,0.85)',
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
    hamburger: {
        position: 'absolute',
        bottom: 0,
        right: -3,
        width: 21,
        height: 21,
        borderRadius: 11,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: PRIMARY,
    },
    welcomeTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
    locTxt: { color: 'rgba(255,255,255,0.92)', fontSize: 14 },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.28)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 15,
        height: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartTxt: { color: PRIMARY, fontSize: 8, fontWeight: '700' },
    bellDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        borderWidth: 1.5,
        borderColor: PRIMARY,
    },

    /* Service section — marginTop: -OVERLAP pulls it over orange */
    serviceSection: {
        backgroundColor: '#fff',
        marginTop: -OVERLAP,
        zIndex: 10, // stays above orange bg
        paddingHorizontal: 12,
        paddingBottom: 16,
    },

    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    r1Item: { flex: 1, alignItems: 'center', marginHorizontal: 4 },
    r1Card: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#fff',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.13,
        shadowRadius: 6,
        elevation: 5,
    },
    r1Emoji: { fontSize: 36 },
    r1Label: {
        color: '#111',
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 15,
    },

    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 4,
    },
    r2Item: { flex: 1, alignItems: 'center', marginHorizontal: 2 },
    r2Emoji: { fontSize: 40, marginBottom: 6 },
    r2Label: {
        color: '#111',
        fontSize: 11,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 15,
    },

    /* Scroll */
    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchInput: { flex: 1, fontSize: 14, color: '#111', marginLeft: 8, paddingVertical: 0 },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },

    toggleRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    toggleBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    toggleActive: { backgroundColor: '#fff', borderColor: '#3B82F6' },
    toggleTxt: { fontSize: 14, fontWeight: '500', color: '#888' },
    toggleTxtActive: { color: '#3B82F6', fontWeight: '600' },

    fieldRow: { flexDirection: 'row' },
    bulletCol: { width: 20, alignItems: 'center', paddingTop: 18, marginRight: 10 },
    bullet: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#888' },
    vLine: { width: 1.5, flex: 1, backgroundColor: '#DDD', marginTop: 4, minHeight: 30 },

    hint: { color: '#999', fontSize: 12, marginBottom: 6 },
    inputBox: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 13 : 8,
    },
    inputTxt: { fontSize: 14, fontWeight: '600', color: '#111', paddingVertical: 0 },

    divider: { height: 1, backgroundColor: '#E8E8E8', marginVertical: 12 },
    tripLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#999',
        letterSpacing: 1,
        marginBottom: 6,
    },
    tripValue: { fontSize: 20, fontWeight: '700', color: '#111' },

    searchBtn: {
        backgroundColor: PRIMARY,
        borderRadius: 999,
        paddingVertical: 17,
        alignItems: 'center',
        marginTop: 6,
    },
    searchBtnTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
