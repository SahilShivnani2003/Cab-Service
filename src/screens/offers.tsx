import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Platform,
    TextInput,
} from 'react-native';

// ─── Theme Constants ────────────────────────────────────────────────────────────
const ORANGE = '#F4651A';
const WHITE = '#FFFFFF';
const BGRAY = '#F2F2F2';
const DARK = '#1A1A1A';
const MGRAY = '#888888';
const BORDER = '#E0E0E0';
const NAV_BG = '#111111';
const GREEN = '#22C55E';
const RED_TAG = '#EF4444';

// ─── Types ──────────────────────────────────────────────────────────────────────
type OfferCategory = 'All' | 'Cabs' | 'Trains' | 'Flights' | 'Hotels';

interface Offer {
    id: number;
    code: string;
    title: string;
    description: string;
    discount: string;
    validTill: string;
    category: OfferCategory;
    emoji: string;
    tag?: string;
    tagColor?: string;
    minBooking?: string;
    maxDiscount?: string;
    bgColor: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const OFFERS: Offer[] = [
    {
        id: 1,
        code: 'FIRST50',
        title: 'First Ride Free!',
        description: 'Get 50% off on your very first cab booking with us.',
        discount: '50% OFF',
        validTill: '31 Mar 2026',
        category: 'Cabs',
        emoji: '🚗',
        tag: 'HOT',
        tagColor: RED_TAG,
        minBooking: '₹200',
        maxDiscount: '₹150',
        bgColor: '#FFF0EA',
    },
    {
        id: 2,
        code: 'TRAIN20',
        title: 'Train Ticket Saver',
        description: 'Save 20% on all train bookings this weekend.',
        discount: '20% OFF',
        validTill: '15 Mar 2026',
        category: 'Trains',
        emoji: '🚆',
        tag: 'LIMITED',
        tagColor: '#F59E0B',
        minBooking: '₹500',
        maxDiscount: '₹200',
        bgColor: '#F0F9FF',
    },
    {
        id: 3,
        code: 'FLY30',
        title: 'Sky High Savings',
        description: 'Flat 30% off on domestic flight bookings.',
        discount: '30% OFF',
        validTill: '28 Mar 2026',
        category: 'Flights',
        emoji: '✈️',
        tag: 'NEW',
        tagColor: '#22C55E',
        minBooking: '₹3000',
        maxDiscount: '₹900',
        bgColor: '#F0FFF4',
    },
    {
        id: 4,
        code: 'STAY25',
        title: 'Hotel Deal',
        description: 'Book any hotel and get flat 25% off your stay.',
        discount: '25% OFF',
        validTill: '30 Apr 2026',
        category: 'Hotels',
        emoji: '🏨',
        minBooking: '₹1000',
        maxDiscount: '₹500',
        bgColor: '#FFF8F0',
    },
    {
        id: 5,
        code: 'RIDE10',
        title: 'Weekend Ride Offer',
        description: 'Take 3 rides this weekend and get ₹100 cashback.',
        discount: '₹100 BACK',
        validTill: '12 Mar 2026',
        category: 'Cabs',
        emoji: '🚕',
        tag: 'EXPIRING',
        tagColor: RED_TAG,
        minBooking: '₹150',
        bgColor: '#FFF0EA',
    },
    {
        id: 6,
        code: 'OUTSTATION15',
        title: 'Outstation Special',
        description: 'Get 15% off on all outstation cab bookings.',
        discount: '15% OFF',
        validTill: '30 Apr 2026',
        category: 'Cabs',
        emoji: '🛣️',
        minBooking: '₹800',
        maxDiscount: '₹300',
        bgColor: '#FFF0EA',
    },
    {
        id: 7,
        code: 'FLYDEAL',
        title: 'Flight + Hotel Combo',
        description: 'Book a flight + hotel together and save big.',
        discount: 'UPTO ₹2000',
        validTill: '15 Apr 2026',
        category: 'Flights',
        emoji: '🌴',
        tag: 'HOT',
        tagColor: RED_TAG,
        bgColor: '#F0FFF4',
    },
];

const CATEGORIES: OfferCategory[] = ['All', 'Cabs', 'Trains', 'Flights', 'Hotels'];

// ─── Offer Card ─────────────────────────────────────────────────────────────────
const OfferCard: React.FC<{
    offer: Offer;
    onCopy: (code: string) => void;
    copied: string | null;
}> = ({ offer, onCopy, copied }) => (
    <View style={[s.offerCard, { backgroundColor: offer.bgColor }]}>
        {/* Tag */}
        {offer.tag && (
            <View style={[s.offerTag, { backgroundColor: offer.tagColor }]}>
                <Text style={s.offerTagTxt}>{offer.tag}</Text>
            </View>
        )}

        {/* Top row */}
        <View style={s.offerTop}>
            <View style={s.offerIconWrap}>
                <Text style={s.offerEmoji}>{offer.emoji}</Text>
            </View>
            <View style={s.offerInfo}>
                <Text style={s.offerTitle}>{offer.title}</Text>
                <Text style={s.offerDesc} numberOfLines={2}>
                    {offer.description}
                </Text>
            </View>
            <View style={s.discountBadge}>
                <Text style={s.discountTxt}>{offer.discount}</Text>
            </View>
        </View>

        {/* Dashed divider */}
        <View style={s.dashedDivider}>
            <View style={s.dashCircleLeft} />
            <View style={s.dashLine} />
            <View style={s.dashCircleRight} />
        </View>

        {/* Bottom row */}
        <View style={s.offerBottom}>
            <View style={s.offerMeta}>
                {offer.minBooking && <Text style={s.offerMetaTxt}>Min: {offer.minBooking}</Text>}
                {offer.maxDiscount && <Text style={s.offerMetaTxt}>Max: {offer.maxDiscount}</Text>}
                <Text style={s.validTxt}>Valid till {offer.validTill}</Text>
            </View>
            <TouchableOpacity
                style={[s.copyBtn, copied === offer.code && s.copyBtnDone]}
                onPress={() => onCopy(offer.code)}
                activeOpacity={0.8}
            >
                <Text style={[s.copyBtnTxt, copied === offer.code && s.copyBtnDoneTxt]}>
                    {copied === offer.code ? '✓ Copied!' : offer.code}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

// ─── Offers Screen ──────────────────────────────────────────────────────────────
export const Offers = ({ navigation }: any) => {
    const [activeCategory, setActiveCategory] = useState<OfferCategory>('All');
    const [couponCode, setCouponCode] = useState('');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const filteredOffers =
        activeCategory === 'All' ? OFFERS : OFFERS.filter(o => o.category === activeCategory);

    const handleCopy = (code: string) => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <View style={s.root}>
            <StatusBar backgroundColor={ORANGE} barStyle="light-content" />

            {/* ━━━ ORANGE HEADER ━━━ */}
            <View style={s.orangeHeader}>
                {/* Top bar */}
                <View style={s.topBar}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => navigation?.goBack()}>
                        <Text style={s.iconBtnTxt}>←</Text>
                    </TouchableOpacity>
                    <Text style={s.headerTitle}>Offers & Deals</Text>
                    <View style={[s.iconBtn, { backgroundColor: 'transparent' }]} />
                </View>

                {/* Savings summary pills */}
                <View style={s.summaryRow}>
                    <View style={s.summaryPill}>
                        <Text style={s.summaryIco}>🎁</Text>
                        <View>
                            <Text style={s.summaryVal}>{OFFERS.length} Offers</Text>
                            <Text style={s.summaryLbl}>Available</Text>
                        </View>
                    </View>
                    <View style={s.summaryPill}>
                        <Text style={s.summaryIco}>💸</Text>
                        <View>
                            <Text style={s.summaryVal}>Upto ₹2000</Text>
                            <Text style={s.summaryLbl}>Max Savings</Text>
                        </View>
                    </View>
                </View>

                {/* Coupon input */}
                <View style={s.couponRow}>
                    <TextInput
                        style={s.couponInput}
                        placeholder="Enter coupon code"
                        placeholderTextColor={MGRAY}
                        value={couponCode}
                        onChangeText={setCouponCode}
                        autoCapitalize="characters"
                    />
                    <TouchableOpacity style={s.applyBtn} activeOpacity={0.85}>
                        <Text style={s.applyBtnTxt}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ━━━ CATEGORY FILTER ━━━ */}
            <View style={s.catBar}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.catScroll}
                >
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[s.catChip, activeCategory === cat && s.catChipActive]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text
                                style={[s.catChipTxt, activeCategory === cat && s.catChipTxtActive]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* ━━━ OFFERS LIST ━━━ */}
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Section label */}
                <View style={s.sectionRow}>
                    <Text style={s.sectionTitle}>
                        {activeCategory === 'All' ? 'All Offers' : `${activeCategory} Offers`}
                    </Text>
                    <Text style={s.sectionCount}>{filteredOffers.length} found</Text>
                </View>

                {filteredOffers.map(offer => (
                    <OfferCard
                        key={offer.id}
                        offer={offer}
                        onCopy={handleCopy}
                        copied={copiedCode}
                    />
                ))}

                {filteredOffers.length === 0 && (
                    <View style={s.empty}>
                        <Text style={s.emptyIco}>😕</Text>
                        <Text style={s.emptyTitle}>No offers found</Text>
                        <Text style={s.emptyDesc}>Check back soon for {activeCategory} deals!</Text>
                    </View>
                )}

                {/* Terms note */}
                <Text style={s.termsTxt}>
                    * All offers are subject to terms & conditions. Valid for limited time only.
                </Text>
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
                    <Text style={[s.navLbl, { color: ORANGE }]}>offers</Text>
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
    },
    iconBtnTxt: { color: WHITE, fontSize: 20, fontWeight: '700' },
    headerTitle: { color: WHITE, fontSize: 19, fontWeight: '800' },

    // Summary pills
    summaryRow: {
        flexDirection: 'row',
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
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
    },
    summaryIco: { fontSize: 26 },
    summaryVal: { fontSize: 15, fontWeight: '800', color: WHITE },
    summaryLbl: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },

    // Coupon input
    couponRow: {
        flexDirection: 'row',
        gap: 10,
    },
    couponInput: {
        flex: 1,
        backgroundColor: WHITE,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 13 : 8,
        fontSize: 14,
        fontWeight: '700',
        color: DARK,
        letterSpacing: 1,
    },
    applyBtn: {
        backgroundColor: DARK,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: Platform.OS === 'ios' ? 13 : 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyBtnTxt: { color: WHITE, fontSize: 14, fontWeight: '700' },

    // ━━━ CATEGORY BAR ━━━
    catBar: {
        backgroundColor: WHITE,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    catScroll: { paddingHorizontal: 14, gap: 8 },
    catChip: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: BGRAY,
        borderWidth: 1,
        borderColor: BORDER,
    },
    catChipActive: {
        backgroundColor: ORANGE,
        borderColor: ORANGE,
    },
    catChipTxt: { fontSize: 13, fontWeight: '600', color: MGRAY },
    catChipTxtActive: { color: WHITE },

    // ━━━ SCROLL ━━━
    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 14, paddingTop: 16, paddingBottom: 16 },

    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: DARK },
    sectionCount: { fontSize: 13, color: MGRAY, fontWeight: '500' },

    // ━━━ OFFER CARD ━━━
    offerCard: {
        borderRadius: 16,
        marginBottom: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BORDER,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },

    // Tag ribbon
    offerTag: {
        position: 'absolute',
        top: 12,
        right: -1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        zIndex: 1,
    },
    offerTagTxt: { color: WHITE, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },

    // Card top
    offerTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        paddingBottom: 14,
    },
    offerIconWrap: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    offerEmoji: { fontSize: 26 },
    offerInfo: { flex: 1, marginRight: 8 },
    offerTitle: { fontSize: 15, fontWeight: '700', color: DARK, marginBottom: 4 },
    offerDesc: { fontSize: 12, color: MGRAY, lineHeight: 17 },
    discountBadge: {
        backgroundColor: ORANGE,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    discountTxt: { color: WHITE, fontSize: 11, fontWeight: '800', textAlign: 'center' },

    // Dashed divider with notches
    dashedDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        marginBottom: 0,
    },
    dashCircleLeft: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: BGRAY,
        marginLeft: -10,
        borderWidth: 1,
        borderColor: BORDER,
    },
    dashLine: {
        flex: 1,
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: BORDER,
    },
    dashCircleRight: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: BGRAY,
        marginRight: -10,
        borderWidth: 1,
        borderColor: BORDER,
    },

    // Card bottom
    offerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        paddingTop: 12,
    },
    offerMeta: { flex: 1 },
    offerMetaTxt: { fontSize: 11, color: MGRAY, marginBottom: 2, fontWeight: '500' },
    validTxt: { fontSize: 11, color: ORANGE, fontWeight: '600', marginTop: 2 },

    // Copy button
    copyBtn: {
        backgroundColor: ORANGE,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 9,
        shadowColor: ORANGE,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4,
    },
    copyBtnDone: {
        backgroundColor: GREEN,
        shadowColor: GREEN,
    },
    copyBtnTxt: {
        color: WHITE,
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    copyBtnDoneTxt: { color: WHITE },

    // Empty
    empty: { alignItems: 'center', paddingVertical: 50 },
    emptyIco: { fontSize: 52, marginBottom: 12 },
    emptyTitle: { fontSize: 17, fontWeight: '700', color: DARK, marginBottom: 6 },
    emptyDesc: { fontSize: 13, color: MGRAY, textAlign: 'center' },

    // Terms
    termsTxt: {
        fontSize: 11,
        color: MGRAY,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 16,
        paddingHorizontal: 10,
    },

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
