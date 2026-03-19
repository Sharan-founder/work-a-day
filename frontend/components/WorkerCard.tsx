import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Worker {
  id: string;
  name: string;
  skill: string;
  experience: number;
  wage: number;
  city: string;
  area: string;
  rating: number;
  completed_jobs: number;
}

interface WorkerCardProps {
  worker: Worker;
  onPress: () => void;
}

export default function WorkerCard({ worker, onPress }: WorkerCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{worker.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{worker.name}</Text>
          <Text style={styles.skill}>{worker.skill}</Text>
        </View>
        <View style={styles.wageBadge}>
          <Text style={styles.wage}>₹{worker.wage}/day</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>⭐ {worker.rating.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{worker.experience}y</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{worker.completed_jobs}</Text>
          <Text style={styles.statLabel}>Jobs done</Text>
        </View>
      </View>

      <Text style={styles.location}>📍 {worker.area}, {worker.city}</Text>
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
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
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
    fontWeight: '600',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  skill: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  wageBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  wage: {
    color: COLORS.surface,
    fontWeight: '600',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});