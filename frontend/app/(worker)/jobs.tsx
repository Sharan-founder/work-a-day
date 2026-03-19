import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import JobCard from '../../components/JobCard';
import { COLORS } from '../../constants/colors';
import { SKILLS } from '../../constants/skills';

const DUMMY_JOBS = [
  { id: '1', title: 'Mason needed for construction', skill: 'Mason', wage: 700, city: 'Hyderabad', area: 'Gachibowli', workers_needed: 3, start_date: '2026-03-20', contractor_name: 'Ravi Constructions' },
  { id: '2', title: 'Electrician for apartment wiring', skill: 'Electrician', wage: 900, city: 'Hyderabad', area: 'Madhapur', workers_needed: 1, start_date: '2026-03-21', contractor_name: 'Sri Electricals' },
  { id: '3', title: 'Painter for 3BHK flat', skill: 'Painter', wage: 600, city: 'Hyderabad', area: 'Kukatpally', workers_needed: 2, start_date: '2026-03-22', contractor_name: 'Color Masters' },
  { id: '4', title: 'Plumber for pipeline work', skill: 'Plumber', wage: 800, city: 'Hyderabad', area: 'Banjara Hills', workers_needed: 2, start_date: '2026-03-23', contractor_name: 'Fix It Fast' },
  { id: '5', title: 'Carpenter for furniture work', skill: 'Carpenter', wage: 750, city: 'Hyderabad', area: 'Secunderabad', workers_needed: 1, start_date: '2026-03-24', contractor_name: 'Wood Works' },
  { id: '6', title: 'Helper for loading work', skill: 'Helper', wage: 500, city: 'Hyderabad', area: 'LB Nagar', workers_needed: 4, start_date: '2026-03-25', contractor_name: 'Quick Logistics' },
];

export default function JobsScreen() {
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [minWage, setMinWage] = useState('');

  const filtered = DUMMY_JOBS.filter((job) => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.area.toLowerCase().includes(search.toLowerCase());
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.length === 0
          ? <Text style={styles.empty}>No jobs found</Text>
          : filtered.map((job) => <JobCard key={job.id} job={job} onPress={() => {}} />)
        }
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
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  wageInput: {
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
  empty: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: 48,
    fontSize: 16,
  },
});