import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const DUMMY_MESSAGES = [
  { id: '1', name: 'Raju Kumar', lastMessage: 'I will be there on time sir', time: '10:30 AM', unread: true },
  { id: '2', name: 'Suresh Babu', lastMessage: 'Can you confirm the location?', time: '9:15 AM', unread: true },
  { id: '3', name: 'Venkat Rao', lastMessage: 'Job completed successfully!', time: 'Yesterday', unread: false },
  { id: '4', name: 'Krishna Das', lastMessage: 'Thank you for the opportunity', time: 'Yesterday', unread: false },
];

export default function ContractorMessages() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Messages</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {DUMMY_MESSAGES.map((msg) => (
          <TouchableOpacity key={msg.id} style={styles.card} activeOpacity={0.8}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{msg.name.charAt(0)}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.name}>{msg.name}</Text>
                <Text style={styles.time}>{msg.time}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.lastMessage} numberOfLines={1}>{msg.lastMessage}</Text>
                {msg.unread && <View style={styles.unreadDot} />}
              </View>
            </View>
          </TouchableOpacity>
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
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  time: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  lastMessage: {
    fontSize: 13,
    color: COLORS.textLight,
    flex: 1,
    marginTop: 2,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    marginLeft: 8,
  },
});