import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { Text } from 'react-native';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function RatingStars({ rating, maxStars = 5, size = 24, interactive = false, onRate }: RatingStarsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <TouchableOpacity
            key={i}
            disabled={!interactive}
            onPress={() => onRate && onRate(i + 1)}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: size, color: filled || half ? COLORS.warning : COLORS.border }}>
              {filled ? '★' : half ? '½' : '☆'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 2,
  },
});