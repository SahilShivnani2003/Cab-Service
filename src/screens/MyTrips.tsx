import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';

// ─── Theme Constants (matches HomeScreen) ──────────────────────────────────────
const ORANGE = '#F4651A';
const WHITE = '#FFFFFF';
const BGRAY = '#F2F2F2';
const DARK = '#1A1A1A';
const MGRAY = '#888888';
const BORDER = '#E0E0E0';
const NAV_BG = '#111111';

// ─── Types ─────────────────────────────────────────────────────────────────────
type TabType = 'upcoming' | 'completed' | 'cancelled';

// ─── Data ───────────────────────────────────────────────────────────────────────
const upcomingTrips = [
    {
        id: 1,
        type: 'cab',
        from: 'Bhopal',
        to: 'Indore',
        date: 'Today, 3:30 PM',
        price: '₹2,450',
        status: 'confirmed',
        vehicle: 'Sedan',
        driver: 'Rajesh Kumar',
        bookingId: 'BK12345',
    },
    {
        id: 2,
        type: 'train',
        from: 'Bhopal Junction',
        to: 'Delhi',
        date: 'Tomorrow, 6:15 AM',
        price: '₹1,280',
        status: 'confirmed',
        trainNo: '12002',
        trainName: 'Bhopal Shatabdi',
        class: '2A',
        seat: 'A1, 23',
        bookingId: 'TR45678',
    },
    {
        id: 3,
        type: 'flight',
        from: 'Bhopal (BHO)',
        to: 'Mumbai (BOM)',
        date: 'Jan 28, 10:45 AM',
        price: '₹5,890',
        status: 'pending',
        airline: 'IndiGo',
        flightNo: '6E-2341',
        bookingId: 'FL89012',
    },
];

const completedTrips = [
    {
        id: 4,
        type: 'cab',
        from: 'Airport',
        to: 'Home',
        date: 'Jan 20, 2026',
        price: '₹450',
        status: 'completed',
        rating: 5,
        bookingId: 'BK11223',
    },
    {
        id: 5,
        type: 'train',
        from: 'Bhopal',
        to: 'Indore',
        date: 'Jan 15, 2026',
        price: '₹320',
        status: 'completed',
        rating: 4,
        bookingId: 'TR33445',
    },
];

const cancelledTrips = [
    {
        id: 6,
        type: 'flight',
        from: 'Bhopal',
        to: 'Bangalore',
        date: 'Jan 18, 2026',
        price: '₹6,500',
        status: 'cancelled',
        refundAmount: '₹5,850',
        bookingId: 'FL55667',
    },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const getTypeIcon = (type: string) => {
    switch (type) {
        case 'cab':
            return '🚗';
        case 'train':
            return '🚂';
        case 'flight':
            return '✈️';
        default:
            return '🚗';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'confirmed':
            return '#22C55E';
        case 'pending':
            return '#F59E0B';
        case 'completed':
            return MGRAY;
        case 'cancelled':
            return '#EF4444';
        default:
            return MGRAY;
    }
};

// ─── MyTrips Screen ────────────────────────────────────────────────────────────
export const MyTrips = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState<TabType>('upcoming');

    const getTripsData = () => {
        switch (activeTab) {
            case 'upcoming':
                return upcomingTrips;
            case 'completed':
                return completedTrips;
            case 'cancelled':
                return cancelledTrips;
            default:
                return [];
        }
    };

    const renderTripCard = (trip: any) => (
        <TouchableOpacity key={trip.id} style={s.tripCard} activeOpacity={0.75}>
            {/* ── Card Header ── */}
            <View style={s.cardHeader}>
                <View style={s.iconWrap}>
                    <Text style={s.typeIcon}>{getTypeIcon(trip.type)}</Text>
                </View>
                <View style={s.routeWrap}>
                    <Text style={s.routeTxt}>
                        {trip.from} → {trip.to}
                    </Text>
                    <Text style={s.dateTxt}>{trip.date}</Text>
                </View>
                <View style={[s.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}>
                    <Text style={s.statusTxt}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </Text>
                </View>
            </View>

            {/* ── Divider ── */}
            <View style={s.divider} />

            {/* ── Details ── */}
            <View style={s.details}>
                {trip.type === 'cab' && trip.vehicle && (
                    <DetailRow label="Vehicle" value={trip.vehicle} />
                )}
                {trip.type === 'train' && trip.trainName && (
                    <>
                        <DetailRow label="Train" value={`${trip.trainNo} - ${trip.trainName}`} />
                        {trip.class && (
                            <DetailRow label="Class / Seat" value={`${trip.class}, ${trip.seat}`} />
                        )}
                    </>
                )}
                {trip.type === 'flight' && trip.airline && (
                    <DetailRow label="Flight" value={`${trip.airline}  ${trip.flightNo}`} />
                )}
                <DetailRow label="Booking ID" value={trip.bookingId} />
            </View>

            {/* ── Footer ── */}
            <View style={s.cardFooter}>
                <View>
                    <Text style={s.priceLbl}>Total Fare</Text>
                    <Text style={s.priceVal}>{trip.price}</Text>
                </View>

                {activeTab === 'upcoming' && (
                    <View style={s.btnRow}>
                        <TouchableOpacity style={s.btnOutline}>
                            <Text style={s.btnOutlineTxt}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnFill}>
                            <Text style={s.btnFillTxt}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {activeTab === 'completed' && (
                    <View style={s.btnRow}>
                        <TouchableOpacity style={s.btnOutline}>
                            <Text style={s.btnOutlineTxt}>Download</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnFill}>
                            <Text style={s.btnFillTxt}>Book Again</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {activeTab === 'cancelled' && trip.refundAmount && (
                    <View style={s.refundRow}>
                        <Text style={s.refundLbl}>Refund:</Text>
                        <Text style={s.refundAmt}>{trip.refundAmount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    const renderEmpty = () => (
        <View style={s.empty}>
            <Text style={s.emptyIco}>
                {activeTab === 'upcoming' ? '📅' : activeTab === 'completed' ? '✅' : '❌'}
            </Text>
            <Text style={s.emptyTitle}>No {activeTab} trips</Text>
            <Text style={s.emptyDesc}>
                {activeTab === 'upcoming'
                    ? 'Book your next journey and it will appear here'
                    : activeTab === 'completed'
                    ? 'Your completed trips will be shown here'
                    : 'You have no cancelled bookings'}
            </Text>
            {activeTab === 'upcoming' && (
                <TouchableOpacity style={s.emptyBtn}>
                    <Text style={s.emptyBtnTxt}>Book Now</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={s.root}>
            <StatusBar backgroundColor={ORANGE} barStyle="light-content" />

            {/* ━━━ ORANGE HEADER (matches HomeScreen orange section) ━━━ */}
            <View style={s.orangeHeader}>
                {/* Top row: back + title + menu */}
                <View style={s.topRow}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => navigation.goBack()}>
                        <Text style={s.iconBtnTxt}>←</Text>
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>My Trips</Text>
                    <TouchableOpacity style={s.iconBtn}>
                        <Text style={s.iconBtnTxt}>⋮</Text>
                    </TouchableOpacity>
                </View>

                {/* Summary pills (upcoming only) */}
                {activeTab === 'upcoming' && (
                    <View style={s.summaryRow}>
                        <View style={s.summaryPill}>
                            <Text style={s.summaryIco}>🎫</Text>
                            <Text style={s.summaryVal}>{upcomingTrips.length}</Text>
                            <Text style={s.summaryLbl}>Upcoming</Text>
                        </View>
                        <View style={s.summaryPill}>
                            <Text style={s.summaryIco}>💰</Text>
                            <Text style={s.summaryVal}>₹9.6K</Text>
                            <Text style={s.summaryLbl}>Total Value</Text>
                        </View>
                    </View>
                )}

                {/* Tabs */}
                <View style={s.tabBar}>
                    {(['upcoming', 'completed', 'cancelled'] as TabType[]).map(tab => (
                        <TouchableOpacity key={tab} style={s.tab} onPress={() => setActiveTab(tab)}>
                            <Text style={[s.tabTxt, activeTab === tab && s.tabTxtActive]}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </Text>
                            {activeTab === tab && <View style={s.tabUnderline} />}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* ━━━ SCROLLABLE CONTENT ━━━ */}
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {getTripsData().length > 0
                    ? getTripsData().map(trip => renderTripCard(trip))
                    : renderEmpty()}
            </ScrollView>

            {/* ━━━ BOTTOM NAV (matches HomeScreen) ━━━ */}
            <View style={s.bottomNav}>
                <TouchableOpacity style={s.navItem}>
                    <Text style={s.navIco}>🏠</Text>
                    <Text style={s.navLbl}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.navItem}>
                    <Text style={[s.navIco, { color: ORANGE }]}>🧳</Text>
                    <Text style={[s.navLbl, { color: ORANGE }]}>My trips</Text>
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
                    <Text style={s.navIco}>👤</Text>
                    <Text style={s.navLbl}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// ─── Detail Row helper ──────────────────────────────────────────────────────────
const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={s.detailRow}>
        <Text style={s.detailLbl}>{label}</Text>
        <Text style={s.detailVal}>{value}</Text>
    </View>
);

// ─── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: BGRAY },

    // ━━━ ORANGE HEADER ━━━
    orangeHeader: {
        backgroundColor: ORANGE,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        paddingBottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 10,
        zIndex: 10,
    },

    // Top row
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 56 : 16,
        paddingBottom: 14,
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

    // Summary pills
    summaryRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 16,
    },
    summaryPill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 14,
        padding: 12,
        gap: 8,
    },
    summaryIco: { fontSize: 24 },
    summaryVal: { fontSize: 18, fontWeight: '800', color: WHITE },
    summaryLbl: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },

    // Tab bar
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        position: 'relative',
    },
    tabTxt: {
        color: 'rgba(255,255,255,0.65)',
        fontSize: 14,
        fontWeight: '600',
    },
    tabTxtActive: { color: WHITE },
    tabUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 12,
        right: 12,
        height: 3,
        backgroundColor: WHITE,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },

    // ━━━ SCROLL ━━━
    scroll: { flex: 1 },
    scrollContent: {
        paddingHorizontal: 14,
        paddingTop: 16,
        paddingBottom: 20,
    },

    // ━━━ TRIP CARD ━━━
    tripCard: {
        backgroundColor: WHITE,
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 4,
    },

    // Card header
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconWrap: {
        width: 46,
        height: 46,
        borderRadius: 12,
        backgroundColor: '#FEF0E8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    typeIcon: { fontSize: 22 },
    routeWrap: { flex: 1 },
    routeTxt: { fontSize: 15, fontWeight: '700', color: DARK, marginBottom: 3 },
    dateTxt: { fontSize: 12, color: MGRAY },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    statusTxt: { color: WHITE, fontSize: 11, fontWeight: '700' },

    // Divider
    divider: { height: 1, backgroundColor: BORDER, marginVertical: 10 },

    // Details
    details: { marginBottom: 10 },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    detailLbl: { fontSize: 13, color: MGRAY },
    detailVal: {
        fontSize: 13,
        color: DARK,
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
    },

    // Card footer
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: BORDER,
    },
    priceLbl: { fontSize: 11, color: MGRAY, marginBottom: 2 },
    priceVal: { fontSize: 20, fontWeight: '800', color: ORANGE },

    // Buttons
    btnRow: { flexDirection: 'row', gap: 8 },
    btnOutline: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: WHITE,
    },
    btnOutlineTxt: { color: MGRAY, fontSize: 13, fontWeight: '600' },
    btnFill: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 9,
        backgroundColor: ORANGE,
    },
    btnFillTxt: { color: WHITE, fontSize: 13, fontWeight: '700' },

    // Refund
    refundRow: { flexDirection: 'row', alignItems: 'center' },
    refundLbl: { fontSize: 13, color: MGRAY, marginRight: 6 },
    refundAmt: { fontSize: 16, fontWeight: '800', color: '#22C55E' },

    // ━━━ EMPTY STATE ━━━
    empty: {
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    emptyIco: { fontSize: 64, marginBottom: 16 },
    emptyTitle: { fontSize: 18, fontWeight: '700', color: DARK, marginBottom: 8 },
    emptyDesc: {
        fontSize: 14,
        color: MGRAY,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },
    emptyBtn: {
        backgroundColor: ORANGE,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        shadowColor: ORANGE,
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    emptyBtnTxt: { color: WHITE, fontSize: 15, fontWeight: '700' },

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
