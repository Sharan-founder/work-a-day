import { View, Text, StyleSheet, ScrollView, TextInput, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { getJobs } from '../../utils/api';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (e) {
      console.log('Error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchJobs(); };

  const filtered = jobs.filter((j: any) =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.contractor_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Jobs</Text>
      <TextInput
        style={styles.search}
        placeholder="Search jobs or contractors..."
        placeholderTextColor={COLORS.textMuted}
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : jobs.length === 0 ? (
        <Text style={styles.emptyText}>No jobs posted yet</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {filtered.map((job: any) => (
            <View key={job.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{job.title}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{job.status}</Text>
                </View>
              </View>
              <Text style={styles.contractor}>{job.contractor_name}</Text>
              <View style={styles.row}>
                <Text style={styles.detail}>🔧 {job.skill}</Text>
                <Text style={styles.detail}>₹{job.wage}/day</Text>
                <Text style={styles.detail}>📍 {job.area}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, paddingTop: 48 },
  heading: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  search: { backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 16, height: 48, fontSize: 14, color: COLORS.text, marginBottom: 16 },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: 48, fontSize: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 15, fontWeight: '600', color: COLORS.text, flex: 1 },
  badge: { backgroundColor: '#EFF6FF', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: COLORS.primary },
  badgeText: { fontSize: 11, fontWeight: '600', color: COLORS.primary },
  contractor: { fontSize: 13, color: COLORS.textLight, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 16 },
  detail: { fontSize: 12, color: COLORS.textMuted },
});