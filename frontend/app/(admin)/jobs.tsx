import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const DUMMY_JOBS = [
  { id: '1', title: 'Mason needed for construction', skill: 'Mason', wage: 700, city: 'Hyderabad', area: 'Gachibowli', contractor: 'Ravi Constructions', applicants: 5, status: 'active' },
  { id: '2', title: 'Electrician for apartment', skill: 'Electrician', wage: 900, city: 'Hyderabad', area: 'Madhapur', contractor: 'Sri Electricals', applicants: 2, status: 'active' },
  { id: '3', title: 'Painter for 3BHK flat', skill: 'Painter', wage: 600, city: 'Hyderabad', area: 'Kukatpally', contractor: 'Color Masters', applicants: 8, status: 'completed' },
  { id: '4', title: 'Plumber for pipeline work', skill: 'Plumber', wage: 800, city: 'Mumbai', area: 'Andheri', contractor: 'Fix It Fast', applicants: 3, status: 'active' },
];

export default function AdminJobs() {
  const [search, setSearch] = useState('');

  const filtered = DUMMY_JOBS.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.contractor.toLowerCase().includes(search.toLowerCase())
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((job) => (
          <View key={job.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{job.title}</Text>
              <View style={[styles.badge, job.status === 'completed' && styles.badgeCompleted]}>
                <Text style={[styles.badgeText, job.status === 'completed' && styles.badgeTextCompleted]}>
                  {job.status}
                </Text>
              </View>
            </View>
            <Text style={styles.contractor}>{job.contractor}</Text>
            <View style={styles.row}>
              <Text style={styles.detail}>🔧 {job.skill}</Text>
              <Text style={styles.detail}>₹{job.wage}/day</Text>
              <Text style={styles.detail}>📍 {job.area}</Text>
            </View>
            <Text style={styles.applicants}>👥 {job.applicants} applicants</Text>
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
    marginBottom: 16,
  },
  search: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  badge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  badgeCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.success,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },
  badgeTextCompleted: {
    color: COLORS.success,
  },
  contractor: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  detail: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  applicants: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
  },
});