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
import { AppLayout } from '../layouts/AppLayout';

export const Home = ({ navigation }: any) => {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [from, setFrom] = useState('Bhopal, Madhya Pradesh');
  const [to, setTo] = useState('Indore, Madhya Pradesh');

  const services = [
    { icon: '✈️', label: 'Flights', color: '#3B82F6' },
    { icon: '🚂', label: 'Trains', color: '#8B5CF6' },
    { icon: '🚗', label: 'Cabs', color: '#10B981' },
    { icon: '🏨', label: 'Hotels', color: '#F59E0B' },
  ];

  const quickActions = [
    { icon: '⏰', label: 'Hourly Stay', subtitle: 'Short stays' },
    { icon: '📦', label: 'Packages', subtitle: 'Holiday deals' },
    { icon: '🚙', label: 'Rentals', subtitle: 'Self drive' },
    { icon: '🗺️', label: 'Outstation', subtitle: 'Long trips' },
  ];

  return (
    <AppLayout >
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      {/* Header */}
      <View style={styles.header}>
        {/* Decorative circles */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />

        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>NS</Text>
            </View>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeSubtext}>Welcome back</Text>
              <Text style={styles.welcomeName}>Neeraj Saini</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconButton}>
              <Text style={styles.headerIcon}>🛒</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconButton}>
              <Text style={styles.headerIcon}>🔔</Text>
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Bhopal, India</Text>
        </View>

        {/* Main Services */}
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceCard}
              activeOpacity={0.7}
            >
              <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text style={styles.serviceLabel}>{service.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Card */}
        <View style={styles.searchCard}>
          {/* Trip Type Toggle */}
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity
              onPress={() => setTripType('round')}
              style={[
                styles.tripTypeButton,
                tripType === 'round' && styles.tripTypeButtonActive,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tripTypeText,
                  tripType === 'round' && styles.tripTypeTextActive,
                ]}
              >
                Round Trip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTripType('oneway')}
              style={[
                styles.tripTypeButton,
                tripType === 'oneway' && styles.tripTypeButtonActive,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tripTypeText,
                  tripType === 'oneway' && styles.tripTypeTextActive,
                ]}
              >
                One Way
              </Text>
            </TouchableOpacity>
          </View>

          {/* From Location */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <View style={styles.greenDot} />
              <Text style={styles.labelText}>From</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>📍</Text>
              <TextInput
                value={from}
                onChangeText={setFrom}
                style={styles.input}
                placeholder="Enter pickup location"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Swap Button */}
          <View style={styles.swapButtonContainer}>
            <TouchableOpacity style={styles.swapButton} activeOpacity={0.7}>
              <Text style={styles.swapIcon}>⇅</Text>
            </TouchableOpacity>
          </View>

          {/* To Location */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <View style={styles.redDot} />
              <Text style={styles.labelText}>To</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>📍</Text>
              <TextInput
                value={to}
                onChangeText={setTo}
                style={styles.input}
                placeholder="Enter destination"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Date & Passengers */}
          <View style={styles.datePassengerRow}>
            <TouchableOpacity style={styles.dateButton} activeOpacity={0.7}>
              <Text style={styles.datePassengerIcon}>📅</Text>
              <View style={styles.datePassengerTextContainer}>
                <Text style={styles.datePassengerLabel}>Date</Text>
                <Text style={styles.datePassengerValue}>25 Jan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.passengerButton} activeOpacity={0.7}>
              <Text style={styles.datePassengerIcon}>👥</Text>
              <View style={styles.datePassengerTextContainer}>
                <Text style={styles.datePassengerLabel}>Passengers</Text>
                <Text style={styles.datePassengerValue}>1 Person</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchButtonText}>Search Rides</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                activeOpacity={0.7}
              >
                <View style={styles.quickActionIconContainer}>
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                </View>
                <View style={styles.quickActionTextContainer}>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                </View>
                <Text style={styles.quickActionArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Offers Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <View style={styles.offerTextContainer}>
                <Text style={styles.offerSubtext}>Limited Time Offer</Text>
                <Text style={styles.offerTitle}>50% OFF</Text>
                <Text style={styles.offerDescription}>On your first booking</Text>
                <TouchableOpacity style={styles.offerButton} activeOpacity={0.8}>
                  <Text style={styles.offerButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.offerEmoji}>🎉</Text>
            </View>
          </View>
        </View>

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
    paddingBottom: 24,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarText: {
    color: '#2563EB',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeTextContainer: {
    marginLeft: 12,
  },
  welcomeSubtext: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
  },
  welcomeName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerIcon: {
    fontSize: 18,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 13,
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: '23%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: -40,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tripTypeButtonActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tripTypeText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  tripTypeTextActive: {
    color: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  labelText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  swapButtonContainer: {
    alignItems: 'center',
    marginVertical: -8,
    zIndex: 1,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  swapIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  datePassengerRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
  },
  passengerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
  },
  datePassengerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  datePassengerTextContainer: {
    flex: 1,
  },
  datePassengerLabel: {
    color: '#6B7280',
    fontSize: 10,
    marginBottom: 2,
  },
  datePassengerValue: {
    color: '#1F2937',
    fontSize: 13,
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  quickActionIcon: {
    fontSize: 24,
  },
  quickActionTextContainer: {
    flex: 1,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  quickActionSubtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  quickActionArrow: {
    fontSize: 24,
    color: '#D1D5DB',
  },
  offerCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#F97316',
    overflow: 'hidden',
  },
  offerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerTextContainer: {
    flex: 1,
  },
  offerSubtext: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 12,
    marginBottom: 4,
  },
  offerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  offerDescription: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 13,
    marginBottom: 16,
  },
  offerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    color: '#F97316',
    fontSize: 14,
    fontWeight: 'bold',
  },
  offerEmoji: {
    fontSize: 60,
    opacity: 0.2,
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