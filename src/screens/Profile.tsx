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
const RED = '#EF4444';

// ─── Profile Screen ────────────────────────────────────────────────────────────
export const Profile = ({ navigation }: any) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);

    const profileStats = [
        { icon: '🎫', label: 'Trips', value: '24' },
        { icon: '⭐', label: 'Rating', value: '4.8' },
        { icon: '💰', label: 'Saved', value: '₹2.5K' },
    ];

    const menuSections = [
        {
            title: 'Account',
            items: [
                { icon: '👤', label: 'Edit Profile', route: 'EditProfile' },
                { icon: '🔒', label: 'Privacy & Security', route: 'Privacy' },
                { icon: '💳', label: 'Payment Methods', route: 'PaymentMethods', badge: '3' },
                { icon: '📍', label: 'Saved Addresses', route: 'SavedAddresses', badge: '5' },
            ],
        },
        {
            title: 'Preferences',
            items: [
                {
                    icon: '🔔',
                    label: 'Notifications',
                    toggle: true,
                    value: notificationsEnabled,
                    onToggle: setNotificationsEnabled,
                },
                {
                    icon: '📍',
                    label: 'Location Services',
                    toggle: true,
                    value: locationEnabled,
                    onToggle: setLocationEnabled,
                },
                { icon: '🌐', label: 'Language', route: 'Language', rightText: 'English' },
                { icon: '🌙', label: 'Theme', route: 'Theme', rightText: 'Light' },
            ],
        },
        {
            title: 'Support',
            items: [
                { icon: '❓', label: 'Help & Support', route: 'Help' },
                { icon: '📋', label: 'Terms & Conditions', route: 'Terms' },
                { icon: '🔐', label: 'Privacy Policy', route: 'PrivacyPolicy' },
                { icon: '⭐', label: 'Rate Us', route: 'RateApp' },
            ],
        },
        {
            title: 'Other',
            items: [
                { icon: '📤', label: 'Share App', route: 'Share' },
                { icon: 'ℹ️', label: 'About', route: 'About', rightText: 'v1.0.0' },
            ],
        },
    ];

    const renderMenuItem = (item: any, index: number) => (
        <TouchableOpacity
            key={index}
            style={s.menuItem}
            activeOpacity={0.7}
            onPress={() => item.route && navigation.navigate(item.route)}
        >
            <View style={s.menuLeft}>
                <View style={s.menuIconBox}>
                    <Text style={s.menuIcon}>{item.icon}</Text>
                </View>
                <Text style={s.menuLabel}>{item.label}</Text>
                {item.badge && (
                    <View style={s.badgePill}>
                        <Text style={s.badgeTxt}>{item.badge}</Text>
                    </View>
                )}
            </View>
            <View style={s.menuRight}>
                {item.toggle ? (
                    <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: BORDER, true: '#FDCAB0' }}
                        thumbColor={item.value ? ORANGE : '#F3F4F6'}
                        ios_backgroundColor={BORDER}
                    />
                ) : (
                    <>
                        {item.rightText && <Text style={s.rightTxt}>{item.rightText}</Text>}
                        <Text style={s.chevron}>›</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={s.root}>
            <StatusBar backgroundColor={ORANGE} barStyle="light-content" />

            {/* ━━━ ORANGE HEADER ━━━ */}
            <View style={s.orangeHeader}>
                <View style={s.topBar}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => navigation.goBack()}>
                        <Text style={s.iconBtnTxt}>←</Text>
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Profile</Text>
                    <TouchableOpacity style={s.iconBtn}>
                        <Text style={s.iconBtnTxt}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Avatar sits at the bottom of the orange header */}
                <View style={s.avatarWrap}>
                    <View style={s.avatar}>
                        <Text style={s.avatarTxt}>NS</Text>
                    </View>
                    <TouchableOpacity style={s.editAvatarBtn}>
                        <Text style={s.editAvatarIco}>📷</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ━━━ SCROLLABLE BODY ━━━ */}
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile info card — overlaps the orange header */}
                <View style={s.profileCard}>
                    <Text style={s.userName}>Neeraj Saini</Text>
                    <Text style={s.userEmail}>neeraj.saini@example.com</Text>
                    <Text style={s.userPhone}>+91 98765 43210</Text>

                    {/* Stats */}
                    <View style={s.statsRow}>
                        {profileStats.map((st, i) => (
                            <View
                                key={i}
                                style={[s.statItem, i < profileStats.length - 1 && s.statBorder]}
                            >
                                <Text style={s.statIco}>{st.icon}</Text>
                                <Text style={s.statVal}>{st.value}</Text>
                                <Text style={s.statLbl}>{st.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Membership Card */}
                <View style={s.memberCard}>
                    <View style={s.memberLeft}>
                        <Text style={s.memberIco}>👑</Text>
                        <View>
                            <Text style={s.memberTitle}>Premium Member</Text>
                            <Text style={s.memberSub}>Valid until Dec 2026</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={s.upgradeBtn}>
                        <Text style={s.upgradeTxt}>Upgrade</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu Sections */}
                {menuSections.map((sec, si) => (
                    <View key={si} style={s.section}>
                        <Text style={s.sectionTitle}>{sec.title}</Text>
                        <View style={s.menuCard}>
                            {sec.items.map((item, ii) => (
                                <View key={ii}>
                                    {renderMenuItem(item, ii)}
                                    {ii < sec.items.length - 1 && <View style={s.menuDivider} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Logout */}
                <TouchableOpacity style={s.logoutBtn} activeOpacity={0.75}>
                    <Text style={s.logoutIco}>🚪</Text>
                    <Text style={s.logoutTxt}>Logout</Text>
                </TouchableOpacity>

                <Text style={s.versionTxt}>App Version 1.0.0</Text>
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
                    <Text style={s.navIco}>🚘</Text>
                    <Text style={s.navLbl}>Driver</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.navItem}>
                    <Text style={[s.navIco, { color: ORANGE }]}>👤</Text>
                    <Text style={[s.navLbl, { color: ORANGE }]}>Profile</Text>
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
        paddingBottom: 30, // extra room so avatar sits nicely
        alignItems: 'center',
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
        width: '100%',
        marginBottom: 20,
    },
    iconBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBtnTxt: { color: WHITE, fontSize: 20, fontWeight: '700' },
    headerTitle: { color: WHITE, fontSize: 19, fontWeight: '800' },

    // Avatar (inside orange)
    avatarWrap: { position: 'relative', marginBottom: -44 }, // half overflows below
    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: WHITE,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 8,
    },
    avatarTxt: { fontSize: 32, fontWeight: '800', color: ORANGE },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: WHITE,
    },
    editAvatarIco: { fontSize: 13 },

    // ━━━ SCROLL ━━━
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 20 },

    // Profile card
    profileCard: {
        backgroundColor: WHITE,
        marginHorizontal: 14,
        marginTop: 56, // space for the overflowing avatar
        borderRadius: 20,
        paddingTop: 52, // room below avatar
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 6,
    },
    userName: { fontSize: 22, fontWeight: '800', color: DARK, marginBottom: 4 },
    userEmail: { fontSize: 13, color: MGRAY, marginBottom: 2 },
    userPhone: { fontSize: 13, color: MGRAY, marginBottom: 20 },

    // Stats row
    statsRow: {
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: BORDER,
        paddingTop: 18,
    },
    statItem: { flex: 1, alignItems: 'center' },
    statBorder: { borderRightWidth: 1, borderRightColor: BORDER },
    statIco: { fontSize: 26, marginBottom: 6 },
    statVal: { fontSize: 18, fontWeight: '800', color: DARK, marginBottom: 3 },
    statLbl: { fontSize: 12, color: MGRAY },

    // Membership card
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF3E0',
        marginHorizontal: 14,
        marginTop: 14,
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#FFD08A',
    },
    memberLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    memberIco: { fontSize: 30, marginRight: 12 },
    memberTitle: { fontSize: 15, fontWeight: '700', color: '#92400E', marginBottom: 2 },
    memberSub: { fontSize: 12, color: '#B45309' },
    upgradeBtn: {
        backgroundColor: ORANGE,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        shadowColor: ORANGE,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4,
    },
    upgradeTxt: { color: WHITE, fontSize: 13, fontWeight: '700' },

    // Menu sections
    section: { marginTop: 20, paddingHorizontal: 14 },
    sectionTitle: {
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
    badgePill: {
        backgroundColor: RED,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    badgeTxt: { color: WHITE, fontSize: 11, fontWeight: '700' },
    menuRight: { flexDirection: 'row', alignItems: 'center' },
    rightTxt: { fontSize: 13, color: MGRAY, marginRight: 6 },
    chevron: { fontSize: 26, color: BORDER },
    menuDivider: { height: 1, backgroundColor: BGRAY, marginLeft: 64 },

    // Logout
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE,
        marginHorizontal: 14,
        marginTop: 22,
        borderRadius: 14,
        paddingVertical: 16,
        borderWidth: 1.5,
        borderColor: '#FECACA',
    },
    logoutIco: { fontSize: 20, marginRight: 8 },
    logoutTxt: { fontSize: 16, fontWeight: '700', color: RED },

    versionTxt: { textAlign: 'center', color: MGRAY, fontSize: 12, marginTop: 20 },

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
