import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function ContractorMessages() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Messages</Text>
      <Text style={styles.emptyText}>No messages yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, paddingTop: 48 },
  heading: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 20 },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: 48, fontSize: 16 },
});