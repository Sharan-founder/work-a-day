import { View, TextInput, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { COLORS } from '../constants/colors';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text.slice(-1);
    const joined = newValue.join('').slice(0, length);
    onChange(joined);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={[
            styles.box,
            value[index] ? styles.boxFilled : null,
            index === value.length ? styles.boxActive : null,
          ]}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
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
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  boxFilled: {
    borderColor: COLORS.primary,
  },
  boxActive: {
    borderColor: COLORS.secondary,
  },
});