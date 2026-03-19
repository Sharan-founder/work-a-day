import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const DUMMY_WORKERS = [
  { id: '1', name: 'Raju Kumar', skill: 'Mason', city: 'Hyderabad', rating: 4.8, jobs: 24, status: 'active' },
  { id: '2', name: 'Suresh Babu', skill: 'Electrician', city: 'Hyderabad', rating: 4.2, jobs: 12, status: 'active' },
  { id: '3', name: 'Venkat Rao', skill: 'Plumber', city: 'Mumbai', rating: 4.9, jobs: 38, status: 'active' },
  { id: '4', name: 'Krishna Das', skill: 'Painter', city: 'Delhi', rating: 3.1, jobs: 5, status: 'suspended' },
  { id: '5', name: 'Ramesh Reddy', skill: 'Carpenter', city: 'Hyderabad', rating: 4.5, jobs: 19, status: 'active' },
];

export default function AdminWorkers() {
  const [search, setSearch] = useState('');

  const filtered = DUMMY_WORKERS.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Workers</Text>
      <TextInput
        style={styles.search}
        placeholder="Search by name or skill..."
        placeholderTextColor={COLORS.textMuted}
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((worker) => (
          <View key={worker.id} style={styles.card}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{worker.name.charAt(0)}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{worker.name}</Text>
                <Text style={styles.detail}>{worker.skill} • {worker.city}</Text>
                <Text style={styles.detail}>⭐ {worker.rating} • {worker.jobs} jobs</Text>
              </View>
              <View style={[styles.statusBadge, worker.status === 'suspended' && styles.statusSuspended]}>
                <Text style={[styles.statusText, worker.status === 'suspended' && styles.statusTextSuspended]}>
                  {worker.status}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.suspendBtn, worker.status === 'suspended' && styles.reinstateBtn]}>
                <Text style={styles.suspendText}>
                  {worker.status === 'suspended' ? 'Reinstate' : 'Suspend'}
                </Text>
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
  detail: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  statusBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  statusSuspended: {
    backgroundColor: '#FEF2F2',
    borderColor: COLORS.error,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.success,
  },
  statusTextSuspended: {
    color: COLORS.error,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  viewText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },
  suspendBtn: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  reinstateBtn: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.success,
  },
  suspendText: {
    fontSize: 13,
    color: COLORS.error,
    fontWeight: '500',
  },
});