import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export const Home = ({ navigation }: any) => {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [from, setFrom] = useState('Bhopal, Madhya Pradesh, India');
  const [to, setTo] = useState('Indore, Madhya Pradesh, India');

  const services = [
    { icon: '✈️', label: 'AirPlane' },
    { icon: '🚂', label: 'Railway' },
    { icon: '🚉', label: 'Outstation' },
    { icon: '🚐', label: 'Hourly\nRentals' },
  ];

  const secondaryServices = [
    { icon: '🏨', label: 'Hourly Stay' },
    { icon: '🏩', label: 'Hotels' },
    { icon: '🏖️', label: 'Holiday\nPackages' },
    { icon: '🚕', label: 'Cabs' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>NS</Text>
              </View>
              <View style={styles.welcomeText}>
                <Text style={styles.welcomeName}>Welcome Neeraj Saini</Text>
                <Text style={styles.location}>📍 Bhopal</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🛒</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🔔</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Service Cards */}
        <View style={styles.servicesContainer}>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <TouchableOpacity key={index} style={styles.serviceCard}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Secondary Services */}
        <View style={styles.secondaryServices}>
          {secondaryServices.map((service, index) => (
            <TouchableOpacity key={index} style={styles.secondaryServiceCard}>
              <Text style={styles.secondaryServiceIcon}>{service.icon}</Text>
              <Text style={styles.secondaryServiceLabel}>{service.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>
              Search for hotels, flights, trains...
            </Text>
          </View>
        </View>

        {/* Booking Form */}
        <View style={styles.bookingForm}>
          {/* Trip Type Toggle */}
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity
              onPress={() => setTripType('round')}
              style={[
                styles.tripTypeButton,
                tripType === 'round' && styles.tripTypeButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tripTypeText,
                  tripType === 'round' && styles.tripTypeTextActive,
                ]}
              >
                Round trip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTripType('oneway')}
              style={[
                styles.tripTypeButton,
                tripType === 'oneway' && styles.tripTypeButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tripTypeText,
                  tripType === 'oneway' && styles.tripTypeTextActive,
                ]}
              >
                One way
              </Text>
            </TouchableOpacity>
          </View>

          {/* From Location */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Text style={styles.bullet}>●</Text>
              <Text style={styles.labelText}>From (Area, Street or Landmark)</Text>
            </View>
            <TextInput
              value={from}
              onChangeText={setFrom}
              style={styles.input}
              placeholder="Enter pickup location"
            />
          </View>

          {/* To Location */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Text style={styles.bullet}>●</Text>
              <Text style={styles.labelText}>To (Area, Street or Landmark)</Text>
            </View>
            <TextInput
              value={to}
              onChangeText={setTo}
              style={styles.input}
              placeholder="Enter destination"
            />
          </View>

          {/* Trip Start */}
          <View style={styles.tripStartContainer}>
            <Text style={styles.tripStartLabel}>TRIP START</Text>
            <Text style={styles.tripStartDate}>Sun, 25 Jan 2026 at 1:41 AM</Text>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💼</Text>
          <Text style={styles.navText}>My trips</Text>
        </TouchableOpacity>
        <View style={styles.navItemCenter}>
          <View style={styles.offerButton}>
            <Text style={styles.offerIcon}>₹</Text>
          </View>
          <Text style={styles.navTextActive}>offers</Text>
        </View>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🚗</Text>
          <Text style={styles.navText}>Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FF6A00',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FF6A00',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    marginLeft: 12,
  },
  welcomeName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  location: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  servicesContainer: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '23%',
  },
  serviceIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  secondaryServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  secondaryServiceCard: {
    alignItems: 'center',
    width: '23%',
  },
  secondaryServiceIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  secondaryServiceLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  bookingForm: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tripTypeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  tripTypeText: {
    color: '#4B5563',
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
  bullet: {
    color: '#000000',
    fontSize: 16,
    marginRight: 8,
  },
  labelText: {
    color: '#6B7280',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  tripStartContainer: {
    marginBottom: 16,
  },
  tripStartLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 8,
  },
  tripStartDate: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    backgroundColor: '#1F2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemCenter: {
    alignItems: 'center',
    marginTop: -32,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  navTextActive: {
    color: '#FF6A00',
    fontSize: 10,
    fontWeight: '600',
  },
  offerButton: {
    backgroundColor: '#FF6A00',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  offerIcon: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
});