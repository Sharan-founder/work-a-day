import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const DUMMY_MESSAGES = [
  { id: '1', name: 'Ravi Constructions', lastMessage: 'Your application has been accepted!', time: '10:30 AM', unread: true },
  { id: '2', name: 'Sri Electricals', lastMessage: 'Can you start tomorrow?', time: '9:15 AM', unread: true },
  { id: '3', name: 'Color Masters', lastMessage: 'Thanks for applying, we will get back to you.', time: 'Yesterday', unread: false },
  { id: '4', name: 'Fix It Fast', lastMessage: 'Job completed. Rating sent!', time: 'Yesterday', unread: false },
];

export default function MessagesScreen() {
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