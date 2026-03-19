import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button';
import { sendOTP } from '../../utils/api';

export default function PhoneScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleSendOTP = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    setError('');
    setOtp('');
    try {
      const res = await sendOTP(phone);
      if (res.otp) {
        setOtp(res.otp);
        setTimeout(() => {
          router.push({ pathname: '/(auth)/otp', params: { phone, otp: res.otp } });
        }, 2000);
      } else {
        setError('Failed to send OTP. Try again.');
      }
    } catch (e) {
      setError('Network error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.appName}>Work A Day</Text>
        <Text style={styles.tagline}>Daily work. Daily pay.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subtitle}>We'll generate a verification code</Text>

        <View style={styles.inputRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryText}>+91</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="10 digit mobile number"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {otp ? (
          <View style={styles.otpBox}>
            <Text style={styles.otpLabel}>Your OTP code:</Text>
            <Text style={styles.otpValue}>{otp}</Text>
            <Text style={styles.otpHint}>Redirecting to verification...</Text>
          </View>
        ) : null}

        <Button
          title="Send OTP"
          onPress={handleSendOTP}
          loading={loading}
          disabled={phone.length < 10}
        />
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
  tagline: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  countryCode: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  countryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    height: 56,
  },
  error: {
    color: COLORS.error,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  otpBox: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  otpLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  otpValue: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.surface,
    letterSpacing: 8,
  },
  otpHint: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 8,
  },
});