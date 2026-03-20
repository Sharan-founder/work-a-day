import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { getContractorJobs, getApplicants } from '../../utils/api';
import RatingStars from '../../components/RatingStars';

export default function ApplicantsScreen() {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchApplicants = async () => {
    try {if (!user?.phone) return;
const jobs = await getContractorJobs(user.phone);
if (!Array.isArray(jobs)) return;
const allApplicants: any[] = [];
for (const job of jobs) {
  const jobApplicants = await getApplicants(job.id);
  if (!Array.isArray(jobApplicants)) continue;
  jobApplicants.forEach((a: any) => {
    allApplicants.push({ ...a, job_title: job.title });
  });
}
setApplicants(allApplicants);} catch (e) {
      console.log('Error fetching applicants:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchApplicants(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchApplicants(); };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Applicants</Text>
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : applicants.length === 0 ? (
        <Text style={styles.emptyText}>No applicants yet</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {applicants.map((applicant: any) => (
            <View key={applicant.application_id} style={styles.card}>
              <View style={styles.header}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{applicant.name.charAt(0)}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{applicant.name}</Text>
                  <Text style={styles.skill}>{applicant.skill} • {applicant.experience} yrs exp</Text>
                  <RatingStars rating={applicant.rating || 0} size={14} />
                </View>
                <View style={styles.wage}>
                  <Text style={styles.wageText}>₹{applicant.wage}</Text>
                  <Text style={styles.wageLabel}>/day</Text>
                </View>
              </View>
              <Text style={styles.jobTitle}>Applied for: {applicant.job_title}</Text>
              <View style={styles.stats}>
                <Text style={styles.statText}>✅ {applicant.completed_jobs} jobs done</Text>
                <Text style={styles.statText}>📍 {applicant.area}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.acceptBtn}>
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn}>
                  <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>
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
  heading: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 20 },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: 48, fontSize: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.surface, fontSize: 20, fontWeight: '700' },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  skill: { fontSize: 12, color: COLORS.textLight },
  wage: { alignItems: 'center' },
  wageText: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  wageLabel: { fontSize: 11, color: COLORS.textMuted },
  jobTitle: { fontSize: 12, color: COLORS.textLight, marginBottom: 10, fontStyle: 'italic' },
  stats: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  statText: { fontSize: 12, color: COLORS.textMuted },
  actions: { flexDirection: 'row', gap: 12 },
  acceptBtn: { flex: 1, backgroundColor: COLORS.success, borderRadius: 10, padding: 12, alignItems: 'center' },
  acceptText: { color: COLORS.surface, fontWeight: '600', fontSize: 14 },
  rejectBtn: { flex: 1, backgroundColor: COLORS.background, borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.error },
  rejectText: { color: COLORS.error, fontWeight: '600', fontSize: 14 },
});