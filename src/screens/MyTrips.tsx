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
import { AppLayout } from '../layouts/AppLayout';

export const MyTrips = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

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
      rating: 4.8,
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
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'completed':
        return '#6B7280';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const renderTripCard = (trip: any) => (
    <TouchableOpacity key={trip.id} style={styles.tripCard} activeOpacity={0.7}>
      {/* Header */}
      <View style={styles.tripHeader}>
        <View style={styles.tripTypeContainer}>
          <View style={[styles.tripTypeIcon, { backgroundColor: getStatusColor(trip.status) + '20' }]}>
            <Text style={styles.tripIcon}>{getTypeIcon(trip.type)}</Text>
          </View>
          <View style={styles.tripHeaderText}>
            <Text style={styles.tripRoute}>{trip.from} → {trip.to}</Text>
            <Text style={styles.tripDate}>{trip.date}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}>
          <Text style={styles.statusText}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.tripDetails}>
        {trip.type === 'cab' && trip.vehicle && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle:</Text>
            <Text style={styles.detailValue}>{trip.vehicle}</Text>
          </View>
        )}
        {trip.type === 'train' && trip.trainName && (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Train:</Text>
              <Text style={styles.detailValue}>{trip.trainNo} - {trip.trainName}</Text>
            </View>
            {trip.class && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Class/Seat:</Text>
                <Text style={styles.detailValue}>{trip.class}, {trip.seat}</Text>
              </View>
            )}
          </>
        )}
        {trip.type === 'flight' && trip.airline && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Flight:</Text>
            <Text style={styles.detailValue}>{trip.airline} {trip.flightNo}</Text>
          </View>
        )}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking ID:</Text>
          <Text style={styles.detailValue}>{trip.bookingId}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.tripFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Fare</Text>
          <Text style={styles.priceValue}>{trip.price}</Text>
        </View>
        
        {activeTab === 'upcoming' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'completed' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Book Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'cancelled' && trip.refundAmount && (
          <View style={styles.refundContainer}>
            <Text style={styles.refundLabel}>Refund:</Text>
            <Text style={styles.refundAmount}>{trip.refundAmount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>
        {activeTab === 'upcoming' ? '📅' : activeTab === 'completed' ? '✅' : '❌'}
      </Text>
      <Text style={styles.emptyTitle}>No {activeTab} trips</Text>
      <Text style={styles.emptyDescription}>
        {activeTab === 'upcoming' 
          ? 'Book your next journey and it will appear here'
          : activeTab === 'completed'
          ? 'Your completed trips will be shown here'
          : 'You have no cancelled bookings'}
      </Text>
      {activeTab === 'upcoming' && (
        <TouchableOpacity style={styles.emptyButton}>
          <Text style={styles.emptyButtonText}>Book Now</Text>
        </TouchableOpacity>
      )}
    </View>
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
          <Text style={styles.headerTitle}>My Trips</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming
            </Text>
            {activeTab === 'upcoming' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('completed')}
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
            {activeTab === 'completed' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('cancelled')}
            style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>
              Cancelled
            </Text>
            {activeTab === 'cancelled' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Cards */}
        {activeTab === 'upcoming' && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🎫</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryValue}>{upcomingTrips.length}</Text>
                <Text style={styles.summaryLabel}>Upcoming</Text>
              </View>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>💰</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryValue}>₹8.6K</Text>
                <Text style={styles.summaryLabel}>Total Value</Text>
              </View>
            </View>
          </View>
        )}

        {/* Trips List */}
        <View style={styles.tripsContainer}>
          {getTripsData().length > 0 ? (
            getTripsData().map(trip => renderTripCard(trip))
          ) : (
            renderEmptyState()
          )}
        </View>
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
    paddingBottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  summaryText: {},
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  tripsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tripTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripIcon: {
    fontSize: 24,
  },
  tripHeaderText: {
    flex: 1,
  },
  tripRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  tripDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceContainer: {},
  priceLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
  primaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  refundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refundLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginRight: 8,
  },
  refundAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
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