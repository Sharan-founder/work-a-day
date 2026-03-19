import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';

export default function RoleSelectScreen() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const selectRole = (role: 'worker' | 'contractor') => {
    if (!user) return;
    setUser({ ...user, role });
    if (role === 'worker') {
      router.replace('/(auth)/worker-setup');
    } else {
      router.replace('/(auth)/contractor-setup');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.appName}>Work A Day</Text>
        <Text style={styles.subtitle}>Who are you?</Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity style={styles.card} onPress={() => selectRole('worker')} activeOpacity={0.8}>
          <Text style={styles.emoji}>👷</Text>
          <Text style={styles.cardTitle}>I am a Worker</Text>
          <Text style={styles.cardDesc}>Find daily wage jobs near you</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.cardSecondary]} onPress={() => selectRole('contractor')} activeOpacity={0.8}>
          <Text style={styles.emoji}>🏗️</Text>
          <Text style={[styles.cardTitle, { color: COLORS.surface }]}>I am a Contractor</Text>
          <Text style={[styles.cardDesc, { color: COLORS.textMuted }]}>Post jobs and hire workers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 24,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.surface,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  cards: {
    gap: 16,
    marginBottom: 48,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  cardSecondary: {
    backgroundColor: COLORS.secondary,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
