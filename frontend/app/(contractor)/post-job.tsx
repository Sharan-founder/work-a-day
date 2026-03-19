import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import { CITIES } from '../../constants/cities';
import { COLORS } from '../../constants/colors';
import { SKILLS } from '../../constants/skills';
import { useAuth } from '../../context/AuthContext';
import { postJob } from '../../utils/api';

export default function PostJobScreen() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    skill: SKILLS[0],
    workers_needed: '',
    wage: '',
    city: 'Hyderabad',
    area: 'Banjara Hills',
    start_date: '',
    start_time: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePost = async () => {
    if (!user) return;
    if (!form.title || !form.wage || !form.workers_needed) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await postJob(user.phone, {
        title: form.title,
        skill: form.skill,
        workers_needed: parseInt(form.workers_needed),
        wage: parseInt(form.wage),
        city: form.city,
        area: form.area,
        start_date: form.start_date,
        start_time: form.start_time,
        description: form.description,
      });
      if (res.job_id) {
        setSuccess(true);
        setForm({
          title: '',
          skill: SKILLS[0],
          workers_needed: '',
          wage: '',
          city: 'Hyderabad',
          area: 'Banjara Hills',
          start_date: '',
          start_time: '',
          description: '',
        });
      } else {
        setError('Failed to post job. Try again.');
      }
    } catch (e) {
      setError('Network error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Post a Job</Text>

      {success && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>Job posted successfully!</Text>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Mason needed for construction"
        placeholderTextColor={COLORS.textMuted}
        value={form.title}
        onChangeText={(v) => setForm({ ...form, title: v })}
      />

      <Text style={styles.label}>Skill Required</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={form.skill} onValueChange={(v) => setForm({ ...form, skill: v })}>
          {SKILLS.map((s) => <Picker.Item key={s} label={s} value={s} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Number of Workers Needed</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 3"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="number-pad"
        value={form.workers_needed}
        onChangeText={(v) => setForm({ ...form, workers_needed: v })}
      />

      <Text style={styles.label}>Wage per Day (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 700"
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

      <Text style={styles.label}>Start Date</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2026-03-25"
        placeholderTextColor={COLORS.textMuted}
        value={form.start_date}
        onChangeText={(v) => setForm({ ...form, start_date: v })}
      />

      <Text style={styles.label}>Start Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 8:00 AM"
        placeholderTextColor={COLORS.textMuted}
        value={form.start_time}
        onChangeText={(v) => setForm({ ...form, start_time: v })}
      />

      <Text style={styles.label}>Job Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the work in detail..."
        placeholderTextColor={COLORS.textMuted}
        multiline
        numberOfLines={4}
        value={form.description}
        onChangeText={(v) => setForm({ ...form, description: v })}
      />

      <Button title="Post Job" onPress={handlePost} loading={loading} />
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
    paddingTop: 48,
    paddingBottom: 48,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 24,
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
  textArea: {
    height: 120,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  pickerBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    overflow: 'hidden',
  },
  successBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  successText: {
    color: COLORS.success,
    fontWeight: '600',
    textAlign: 'center',
  },
  error: {
    color: COLORS.error,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
});