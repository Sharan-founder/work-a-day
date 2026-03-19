import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import { CITIES } from '../../constants/cities';
import { COLORS } from '../../constants/colors';
import { SKILLS } from '../../constants/skills';
import { useAuth } from '../../context/AuthContext';
import { setupWorker } from '../../utils/api';

export default function WorkerSetupScreen() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: '',
    skill: SKILLS[0],
    experience: '',
    wage: '',
    city: 'Hyderabad',
    area: 'Banjara Hills',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!user) return;
    if (!form.name || !form.experience || !form.wage) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await setupWorker(user.phone, {
        name: form.name,
        skill: form.skill,
        experience: parseInt(form.experience),
        wage: parseInt(form.wage),
        city: form.city,
        area: form.area,
      });
      if (res.message === 'Worker profile saved') {
        setUser({ ...user, name: form.name, profile_complete: true, role: 'worker' });
        router.replace('/(worker)/home');
      } else {
        setError('Failed to save profile. Try again.');
      }
    } catch (e) {
      setError('Network error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Set up your profile</Text>
      <Text style={styles.subtitle}>Help contractors find you</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor={COLORS.textMuted}
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
      />

      <Text style={styles.label}>Skill</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={form.skill} onValueChange={(v) => setForm({ ...form, skill: v })}>
          {SKILLS.map((s) => <Picker.Item key={s} label={s} value={s} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Years of Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 3"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="number-pad"
        value={form.experience}
        onChangeText={(v) => setForm({ ...form, experience: v })}
      />

      <Text style={styles.label}>Daily Wage Expectation (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 600"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="number-pad"
        value={form.wage}
        onChangeText={(v) => setForm({ ...form, wage: v })}
      />

      <Text style={styles.label}>City</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={form.city}
          onValueChange={(v) => setForm({ ...form, city: v, area: CITIES[v][0] })}
        >
          {Object.keys(CITIES).map((c) => <Picker.Item key={c} label={c} value={c} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Area</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={form.area} onValueChange={(v) => setForm({ ...form, area: v })}>
          {CITIES[form.city].map((a) => <Picker.Item key={a} label={a} value={a} />)}
        </Picker>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Save Profile" onPress={handleSave} loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    marginTop: 48,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    height: 56,
    marginBottom: 20,
  },
  pickerBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    overflow: 'hidden',
  },
  error: {
    color: COLORS.error,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
});