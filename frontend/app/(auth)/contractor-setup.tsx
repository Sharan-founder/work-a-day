import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import { CITIES } from '../../constants/cities';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { setupContractor } from '../../utils/api';

export default function ContractorSetupScreen() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: '',
    company: '',
    city: 'Hyderabad',
    area: 'Banjara Hills',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!user) return;
    if (!form.name || !form.company) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await setupContractor(user.phone, {
        name: form.name,
        company: form.company,
        city: form.city,
        area: form.area,
      });
      if (res.message === 'Contractor profile saved') {
        setUser({ ...user, name: form.name, profile_complete: true, role: 'contractor' });
        router.replace('/(contractor)/home');
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
      <Text style={styles.subtitle}>Tell workers about your business</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor={COLORS.textMuted}
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
      />

      <Text style={styles.label}>Company / Contractor Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter company name"
        placeholderTextColor={COLORS.textMuted}
        value={form.company}
        onChangeText={(v) => setForm({ ...form, company: v })}
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
        <Picker
          selectedValue={form.area}
          onValueChange={(v) => setForm({ ...form, area: v })}
        >
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