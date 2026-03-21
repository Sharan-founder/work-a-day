import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { getContractorJobs } from '../../utils/api';
import { useRouter } from 'expo-router';

export default function ContractorHome() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = async () => {
    try {
      if (!user?.phone) return;
      const data = await getContractorJobs(user.phone);
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

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Contractor'} 👋</Text>
          <Text style={styles.subtitle}>Manage your job postings</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/(contractor)/post-job')}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'C').charAt(0).toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{jobs.length}</Text>
          <Text style={styles.statLabel}>Active jobs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.7⭐</Text>
          <Text style={styles.statLabel}>Your rating</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Posted Jobs</Text>

      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : jobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No jobs posted yet</Text>
          <TouchableOpacity style={styles.postBtn} onPress={() => router.push('/(contractor)/post-job')}>
            <Text style={styles.postBtnText}>Post your first job</Text>
          </TouchableOpacity>
        </View>
      ) : (
        jobs.map((job: any) => (
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
            </View>
          </View>
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  addBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: COLORS.surface, fontSize: 28, fontWeight: '400', lineHeight: 32 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.surface, fontSize: 18, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 18, fontWeight: '700', color: COLORS.secondary },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  emptyContainer: { alignItems: 'center', marginTop: 48, gap: 16 },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, fontSize: 16 },
  postBtn: { backgroundColor: COLORS.secondary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 },
  postBtnText: { color: COLORS.surface, fontWeight: '600', fontSize: 15 },
  jobCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  jobTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text, flex: 1 },
  wageBadge: { backgroundColor: COLORS.secondary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  wageText: { color: COLORS.surface, fontWeight: '600', fontSize: 12 },
  jobRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  jobDetail: { fontSize: 12, color: COLORS.textMuted },
  jobFooter: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: { backgroundColor: COLORS.background, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: COLORS.border },
  tagText: { fontSize: 12, color: COLORS.textLight },
});