import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import RatingStars from '../../components/RatingStars';

const GEMINI_API_KEY = 'AIzaSyCWG7paQa1XTRyrKz3HrL3iWqkBegUOFyQ'; // 🔑 Replace with your key

export default function WorkerProfile() {
  const { user, logout } = useAuth();
  const [skillInput, setSkillInput] = useState('');
  const [detectedSkills, setDetectedSkills] = useState<string[]>([]);
  const [detecting, setDetecting] = useState(false);

  const detectSkills = async () => {
    if (!skillInput.trim()) {
      Alert.alert('Please describe your work first');
      return;
    }

    setDetecting(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a skill extractor for a daily wage worker platform in India.
The worker said: "${skillInput}"
Extract their work skills from this. Return ONLY a JSON array of skill names in English, nothing else.
Example: ["Mason", "Carpenter", "Painter"]
Only include skills from this list if they match: Mason, Carpenter, Electrician, Plumber, Painter, Helper, Welder, Tiler, Roofer, Driver, Security Guard, Cleaner, Gardener.
If nothing matches, return the closest match from the list.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
      const clean = text.replace(/```json|```/g, '').trim();
      const skills = JSON.parse(clean);
      setDetectedSkills(Array.isArray(skills) ? skills : []);
    } catch (e) {
      Alert.alert('Could not detect skills', 'Please try again');
      console.log('Gemini error:', e);
    } finally {
      setDetecting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name || 'W').charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Worker'}</Text>
        <Text style={styles.phone}>{user?.phone}</Text>
        <RatingStars rating={0} size={20} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Jobs done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0.0</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* ✨ AI SKILL DETECTION SECTION */}
      <View style={styles.aiSection}>
        <View style={styles.aiHeader}>
          <Text style={styles.aiIcon}>✨</Text>
          <Text style={styles.sectionTitle}>AI Skill Detection</Text>
        </View>
        <Text style={styles.aiSubtitle}>
          Describe your work in any language — our AI will detect your skills
        </Text>
        <TextInput
          style={styles.aiInput}
          placeholder="e.g. I do mason work and painting, 5 years experience..."
          placeholderTextColor={COLORS.textMuted}
          value={skillInput}
          onChangeText={setSkillInput}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity
          style={[styles.aiBtn, detecting && styles.aiBtnDisabled]}
          onPress={detectSkills}
          disabled={detecting}
        >
          {detecting
            ? <ActivityIndicator color={COLORS.surface} size="small" />
            : <Text style={styles.aiBtnText}>🤖 Detect My Skills</Text>
          }
        </TouchableOpacity>

        {detectedSkills.length > 0 && (
          <View style={styles.skillsResult}>
            <Text style={styles.skillsResultLabel}>Detected Skills:</Text>
            <View style={styles.skillChips}>
              {detectedSkills.map((skill) => (
                <View key={skill} style={styles.skillChip}>
                  <Text style={styles.skillChipText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone</Text>
          <Text style={styles.detailValue}>{user?.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Role</Text>
          <Text style={styles.detailValue}>Worker</Text>
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
  header: { backgroundColor: COLORS.primary, alignItems: 'center', paddingTop: 64, paddingBottom: 32, gap: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  avatarText: { color: COLORS.surface, fontSize: 32, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: COLORS.surface },
  phone: { fontSize: 14, color: COLORS.textMuted },
  statsRow: { flexDirection: 'row', gap: 12, padding: 20 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },

  // AI Section
  aiSection: { backgroundColor: COLORS.surface, borderRadius: 16, marginHorizontal: 20, marginBottom: 16, padding: 20, borderWidth: 1, borderColor: COLORS.primary },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  aiIcon: { fontSize: 20 },
  aiSubtitle: { fontSize: 13, color: COLORS.textMuted, marginBottom: 12 },
  aiInput: { backgroundColor: COLORS.background, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, padding: 12, fontSize: 14, color: COLORS.text, minHeight: 80, textAlignVertical: 'top', marginBottom: 12 },
  aiBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
  aiBtnDisabled: { opacity: 0.6 },
  aiBtnText: { color: COLORS.surface, fontSize: 15, fontWeight: '600' },
  skillsResult: { marginTop: 16 },
  skillsResultLabel: { fontSize: 13, color: COLORS.textLight, marginBottom: 8, fontWeight: '600' },
  skillChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip: { backgroundColor: COLORS.primary + '20', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: COLORS.primary },
  skillChipText: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },

  section: { backgroundColor: COLORS.surface, borderRadius: 16, marginHorizontal: 20, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  detailLabel: { fontSize: 14, color: COLORS.textLight },
  detailValue: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  logoutBtn: { margin: 20, backgroundColor: COLORS.error, borderRadius: 12, padding: 16, alignItems: 'center' },
  logoutText: { color: COLORS.surface, fontSize: 16, fontWeight: '600' },
});