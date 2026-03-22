import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { getNotifications } from '../../utils/api';

export default function WorkerMessages() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      if (!user?.phone) return;
      const data = await getNotifications(user.phone);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log('Error fetching notifications:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchNotifications(); };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Messages</Text>
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : notifications.length === 0 ? (
        <Text style={styles.emptyText}>No messages yet</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {notifications.map((n: any) => (
            <View key={n.id} style={styles.card}>
              <View style={styles.iconRow}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>🔔</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>Job Update</Text>
                  <Text style={styles.time}>
                    {new Date(n.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                {!n.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.message}>{n.message}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, paddingTop: 48 },
  heading: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 20 },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: 48, fontSize: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  icon: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 20 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  time: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.secondary },
  message: { fontSize: 14, color: COLORS.textLight, lineHeight: 20 },
});