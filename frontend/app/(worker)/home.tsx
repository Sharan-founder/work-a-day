import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import JobCard from '../../components/JobCard';
import { getJobs, applyJob } from '../../utils/api';

export default function WorkerHome() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log('Error fetching jobs:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchJobs(); };

  const handleApply = async (jobId: string) => {
    if (!user?.id) return;
    try {
      const res = await applyJob(jobId, user.id);
      if (res.message === 'Applied successfully') {
        setAppliedJobs([...appliedJobs, jobId]);
      }
    } catch (e) {
      console.log('Error applying:', e);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Worker'} 👋</Text>
          <Text style={styles.subtitle}>Jobs available near you</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name || 'W').charAt(0).toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{jobs.length}</Text>
          <Text style={styles.statLabel}>Jobs nearby</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{appliedJobs.length}</Text>
          <Text style={styles.statLabel}>Applied</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Latest Jobs</Text>

      {loading ? (
        <Text style={styles.emptyText}>Loading jobs...</Text>
      ) : jobs.length === 0 ? (
        <Text style={styles.emptyText}>No jobs available right now</Text>
      ) : (
        jobs.map((job: any) => (
          <JobCard
            key={job.id}
            job={job}
            onPress={() => {}}
            onApply={() => handleApply(job.id)}
            applied={appliedJobs.includes(job.id)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, marginBottom: 24 },
  greeting: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.surface, fontSize: 20, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: 48, fontSize: 16 },
});