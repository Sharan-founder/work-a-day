import { View, TextInput, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { COLORS } from '../constants/colors';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);

  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => (
        <View
          key={index}
          style={[styles.box, digit ? styles.boxFilled : null, index === value.length ? styles.boxActive : null]}
        >
          <TextInput
            ref={index === 0 ? inputRef : null}
            style={styles.digit}
            value={digit}
            onChangeText={(text) => {
              const newValue = value.split('');
              newValue[index] = text.slice(-1);
              onChange(newValue.join('').slice(0, length));
            }}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  box: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxFilled: {
    borderColor: COLORS.primary,
  },
  boxActive: {
    borderColor: COLORS.secondary,
  },
  digit: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
});