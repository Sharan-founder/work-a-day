import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { SKILLS } from '../../constants/skills';
import JobCard from '../../components/JobCard';
import { getJobs, applyJob } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function JobsScreen() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [minWage, setMinWage] = useState('');
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

  const filtered = jobs.filter((job: any) => {
    const matchSearch = job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.area?.toLowerCase().includes(search.toLowerCase());
    const matchSkill = selectedSkill === 'All' || job.skill === selectedSkill;
    const matchWage = !minWage || job.wage >= parseInt(minWage);
    return matchSearch && matchSkill && matchWage;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse Jobs</Text>
      <TextInput
        style={styles.search}
        placeholder="Search by title or area..."
        placeholderTextColor={COLORS.textMuted}
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {['All', ...SKILLS].map((skill) => (
          <TouchableOpacity
            key={skill}
            style={[styles.filterChip, selectedSkill === skill && styles.filterChipActive]}
            onPress={() => setSelectedSkill(skill)}
          >
            <Text style={[styles.filterText, selectedSkill === skill && styles.filterTextActive]}>
              {skill}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TextInput
        style={styles.wageInput}
        placeholder="Min wage (₹)"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="number-pad"
        value={minWage}
        onChangeText={setMinWage}
      />
      {loading ? (
        <Text style={styles.empty}>Loading jobs...</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {filtered.length === 0
            ? <Text style={styles.empty}>No jobs found</Text>
            : filtered.map((job: any) => (
              <JobCard
                key={job.id}
                job={job}
                onPress={() => {}}
                onApply={() => handleApply(job.id)}
                applied={appliedJobs.includes(job.id)}
              />
            ))
          }
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, paddingTop: 48 },
  heading: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  search: { backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 16, height: 48, fontSize: 14, color: COLORS.text, marginBottom: 12 },
  filterRow: { marginBottom: 12 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, marginRight: 8 },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 13, color: COLORS.textLight },
  filterTextActive: { color: COLORS.surface, fontWeight: '600' },
  wageInput: { backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 16, height: 48, fontSize: 14, color: COLORS.text, marginBottom: 16 },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: 48, fontSize: 16 },
});