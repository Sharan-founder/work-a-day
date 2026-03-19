import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import OTPInput from '../../components/OTPInput';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { verifyOTP } from '../../utils/api';

export default function OTPScreen() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { setUser } = useAuth();

  const handleVerify = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    setError('');
    try {
      const res = await verifyOTP(phone, otp);
      if (res.token && res.user) {
        setUser({
          id: res.user.id,
          phone: res.user.phone,
          role: res.user.role,
          name: res.user.name,
          profile_complete: res.user.profile_complete,
        });
        if (res.user.role === 'admin') {
          router.replace('/(admin)/dashboard');
        } else if (res.user.profile_complete) {
          if (res.user.role === 'worker') {
            router.replace('/(worker)/home');
          } else {
            router.replace('/(contractor)/home');
          }
        } else {
          router.replace('/(auth)/role-select');
        }
      } else {
        setError('Invalid OTP. Please try again.');
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
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to +91 {phone}</Text>

        <View style={styles.otpContainer}>
          <OTPInput value={otp} onChange={setOtp} length={6} />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          title="Verify OTP"
          onPress={handleVerify}
          loading={loading}
          disabled={otp.length < 6}
        />

        <TouchableOpacity style={styles.resend}>
          <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendLink}>Resend</Text></Text>
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
  otpContainer: {
    marginBottom: 24,
  },
  error: {
    color: COLORS.error,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  resend: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  resendLink: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
});