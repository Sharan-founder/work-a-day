import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { getAdminStats } from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_workers: 0,
    total_contractors: 0,
    active_jobs: 0,
    completed_jobs: 0,
    total_applications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (e) {
      console.log('Error fetching stats:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const STATS = [
    { label: 'Total Workers', value: stats.total_workers.toString(), emoji: '👷' },
    { label: 'Total Contractors', value: stats.total_contractors.toString(), emoji: '🏗️' },
    { label: 'Active Jobs', value: stats.active_jobs.toString(), emoji: '💼' },
    { label: 'Completed Jobs', value: stats.completed_jobs.toString(), emoji: '✅' },
    { label: 'Total Applications', value: stats.total_applications.toString(), emoji: '📋' },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.heading}>Admin Dashboard</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading stats...</Text>
      ) : (
        <View style={styles.grid}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Quick Info</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Pull down to refresh stats</Text>
        <Text style={styles.infoText}>Admin phone: 9999999999</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 48,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: 48,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
});