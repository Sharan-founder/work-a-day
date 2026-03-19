import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

const DUMMY_POSTED_JOBS = [
  { id: '1', title: 'Mason needed for construction', skill: 'Mason', wage: 700, area: 'Gachibowli', workers_needed: 3, applicants: 5, start_date: '2026-03-20' },
  { id: '2', title: 'Electrician for apartment wiring', skill: 'Electrician', wage: 900, area: 'Madhapur', workers_needed: 1, applicants: 2, start_date: '2026-03-21' },
  { id: '3', title: 'Painter for 3BHK flat', skill: 'Painter', wage: 600, area: 'Kukatpally', workers_needed: 2, applicants: 8, start_date: '2026-03-22' },
];

export default function ContractorHome() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Contractor'} 👋</Text>
          <Text style={styles.subtitle}>Manage your job postings</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name || 'C').charAt(0).toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Active jobs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Applicants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.7⭐</Text>
          <Text style={styles.statLabel}>Your rating</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Posted Jobs</Text>

      {DUMMY_POSTED_JOBS.map((job) => (
        <View key={job.id} style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <View style={styles.wageBadge}>
              <Text style={styles.wageText}>₹{job.wage}/day</Text>
            </View>
          </View>
          <View style={styles.jobRow}>
            <Text style={styles.jobDetail}>📍 {job.area}</Text>
            <Text style={styles.jobDetail}>🗓 {job.start_date}</Text>
          </View>
          <View style={styles.jobFooter}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{job.skill}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{job.workers_needed} workers needed</Text>
            </View>
            <View style={[styles.tag, styles.tagGreen]}>
              <Text style={[styles.tagText, { color: COLORS.success }]}>{job.applicants} applicants</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.surface,
    fontSize: 20,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  jobCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  wageBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  wageText: {
    color: COLORS.surface,
    fontWeight: '600',
    fontSize: 12,
  },
  jobRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  jobDetail: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  jobFooter: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagGreen: {
    borderColor: COLORS.success,
    backgroundColor: '#F0FDF4',
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});