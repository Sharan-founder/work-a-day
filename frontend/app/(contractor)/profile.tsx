import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import RatingStars from '../../components/RatingStars';

export default function ContractorProfile() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name || 'C').charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Contractor'}</Text>
        <Text style={styles.phone}>{user?.phone}</Text>
        <RatingStars rating={0} size={20} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Jobs posted</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0.0</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone</Text>
          <Text style={styles.detailValue}>{user?.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Role</Text>
          <Text style={styles.detailValue}>Contractor</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.secondary, alignItems: 'center', paddingTop: 64, paddingBottom: 32, gap: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  avatarText: { color: COLORS.secondary, fontSize: 32, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: COLORS.surface },
  phone: { fontSize: 14, color: COLORS.surface, opacity: 0.8 },
  statsRow: { flexDirection: 'row', gap: 12, padding: 20 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 18, fontWeight: '700', color: COLORS.secondary },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  section: { backgroundColor: COLORS.surface, borderRadius: 16, marginHorizontal: 20, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  detailLabel: { fontSize: 14, color: COLORS.textLight },
  detailValue: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  logoutBtn: { margin: 20, backgroundColor: COLORS.error, borderRadius: 12, padding: 16, alignItems: 'center' },
  logoutText: { color: COLORS.surface, fontSize: 16, fontWeight: '600' },
});