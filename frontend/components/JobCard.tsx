import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Job {
  id: string;
  title: string;
  skill: string;
  wage: number;
  city: string;
  area: string;
  workers_needed: number;
  start_date: string;
  contractor_name: string;
}

interface JobCardProps {
  job: Job;
  onPress: () => void;
  onApply?: () => void;
  applied?: boolean;
}

export default function JobCard({ job, onPress, onApply, applied }: JobCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={styles.wageBadge}>
          <Text style={styles.wage}>₹{job.wage}/day</Text>
        </View>
      </View>

      <Text style={styles.contractor}>{job.contractor_name}</Text>

      <View style={styles.row}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.skill}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.workers_needed} workers</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.location}>📍 {job.area}, {job.city}</Text>
        <Text style={styles.date}>🗓 {job.start_date}</Text>
      </View>

      {onApply && (
        <TouchableOpacity
          style={[styles.applyBtn, applied && styles.appliedBtn]}
          onPress={applied ? undefined : onApply}
          activeOpacity={applied ? 1 : 0.8}
        >
          <Text style={[styles.applyText, applied && styles.appliedText]}>
            {applied ? 'Applied ✓' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  wageBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  wage: {
    color: COLORS.surface,
    fontWeight: '600',
    fontSize: 13,
  },
  contractor: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  location: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  date: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  applyBtn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  appliedBtn: {
    backgroundColor: COLORS.success,
  },
  applyText: {
    color: COLORS.surface,
    fontWeight: '600',
    fontSize: 14,
  },
  appliedText: {
    color: COLORS.surface,
  },
});