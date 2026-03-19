import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const DUMMY_PAYMENTS = [
  { id: '1', worker: 'Raju Kumar', contractor: 'Ravi Constructions', amount: 700, job: 'Mason work', date: '2026-03-18', status: 'released' },
  { id: '2', worker: 'Suresh Babu', contractor: 'Sri Electricals', amount: 900, job: 'Electrical wiring', date: '2026-03-17', status: 'pending' },
  { id: '3', worker: 'Venkat Rao', contractor: 'Color Masters', amount: 600, job: 'Painting work', date: '2026-03-16', status: 'released' },
  { id: '4', worker: 'Krishna Das', contractor: 'Fix It Fast', amount: 800, job: 'Plumbing work', date: '2026-03-15', status: 'pending' },
  { id: '5', worker: 'Ramesh Reddy', contractor: 'Wood Works', amount: 750, job: 'Carpentry work', date: '2026-03-14', status: 'released' },
];

export default function AdminPayments() {
  const total = DUMMY_PAYMENTS.reduce((sum, p) => sum + p.amount, 0);
  const pending = DUMMY_PAYMENTS.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const released = DUMMY_PAYMENTS.filter((p) => p.status === 'released').reduce((sum, p) => sum + p.amount, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Payments</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>₹{total}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={[styles.summaryCard, styles.summaryGreen]}>
          <Text style={[styles.summaryValue, { color: COLORS.success }]}>₹{released}</Text>
          <Text style={styles.summaryLabel}>Released</Text>
        </View>
        <View style={[styles.summaryCard, styles.summaryAmber]}>
          <Text style={[styles.summaryValue, { color: COLORS.warning }]}>₹{pending}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Transactions</Text>
      {DUMMY_PAYMENTS.map((payment) => (
        <View key={payment.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.jobTitle}>{payment.job}</Text>
              <Text style={styles.names}>{payment.worker} ← {payment.contractor}</Text>
            </View>
            <View style={[styles.badge, payment.status === 'released' ? styles.badgeGreen : styles.badgeAmber]}>
              <Text style={[styles.badgeText, { color: payment.status === 'released' ? COLORS.success : COLORS.warning }]}>
                {payment.status}
              </Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.amount}>₹{payment.amount}</Text>
            <Text style={styles.date}>{payment.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryGreen: {
    borderColor: COLORS.success,
    backgroundColor: '#F0FDF4',
  },
  summaryAmber: {
    borderColor: COLORS.warning,
    backgroundColor: '#FFFBEB',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
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
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  names: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  badgeGreen: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.success,
  },
  badgeAmber: {
    backgroundColor: '#FFFBEB',
    borderColor: COLORS.warning,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  date: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});