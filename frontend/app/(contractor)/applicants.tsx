import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RatingStars from '../../components/RatingStars';
import { COLORS } from '../../constants/colors';

const DUMMY_APPLICANTS = [
  { id: '1', name: 'Raju Kumar', skill: 'Mason', experience: 5, wage: 700, rating: 4.8, completed_jobs: 24, city: 'Hyderabad', area: 'Gachibowli', job: 'Mason needed for construction' },
  { id: '2', name: 'Suresh Babu', skill: 'Mason', experience: 3, wage: 650, rating: 4.2, completed_jobs: 12, city: 'Hyderabad', area: 'Madhapur', job: 'Mason needed for construction' },
  { id: '3', name: 'Venkat Rao', skill: 'Mason', experience: 7, wage: 750, rating: 4.9, completed_jobs: 38, city: 'Hyderabad', area: 'Kukatpally', job: 'Mason needed for construction' },
  { id: '4', name: 'Krishna Das', skill: 'Electrician', experience: 4, wage: 900, rating: 4.5, completed_jobs: 18, city: 'Hyderabad', area: 'Banjara Hills', job: 'Electrician for apartment wiring' },
];

export default function ApplicantsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Applicants</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {DUMMY_APPLICANTS.map((applicant) => (
          <View key={applicant.id} style={styles.card}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{applicant.name.charAt(0)}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{applicant.name}</Text>
                <Text style={styles.skill}>{applicant.skill} • {applicant.experience} yrs exp</Text>
                <RatingStars rating={applicant.rating} size={14} />
              </View>
              <View style={styles.wage}>
                <Text style={styles.wageText}>₹{applicant.wage}</Text>
                <Text style={styles.wageLabel}>/day</Text>
              </View>
            </View>

            <Text style={styles.jobTitle}>Applied for: {applicant.job}</Text>

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
    </View>
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
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.surface,
    fontSize: 20,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  skill: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  wage: {
    alignItems: 'center',
  },
  wageText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  wageLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  jobTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: COLORS.success,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  acceptText: {
    color: COLORS.surface,
    fontWeight: '600',
    fontSize: 14,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  rejectText: {
    color: COLORS.error,
    fontWeight: '600',
    fontSize: 14,
  },
});