import React, {useMemo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Product} from '../features/products/productsSlice';
import {ThemeColors, useThemeColors} from '../theme/colors';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

type Props = {
  product: Product;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isFavorite,
  onPress,
  onToggleFavorite,
}) => {
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: product.image}} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        {product.rating && (
          <Text style={styles.rating}>
            ⭐ {product.rating.rate.toFixed(1)} ({product.rating.count})
          </Text>
        )}

        <TouchableOpacity
          onPress={() => {
            ReactNativeHapticFeedback.trigger("impactLight");
            onToggleFavorite();
          }}
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          activeOpacity={0.8}>
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      padding: 12,
      marginHorizontal: 12,
      marginVertical: 6,
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      alignItems: 'center',
    },
    image: {
      width: 64,
      height: 64,
      marginRight: 12,
      borderRadius: 4,
      resizeMode: 'contain',
    },
    info: {
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: '600',
      marginBottom: 4,
      color: colors.text,
    },
    price: {
      fontWeight: '700',
      marginBottom: 2,
      color: colors.text,
    },
    rating: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 6,
    },

    favoriteButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: colors.primaryButton, 
      marginTop: 2,
    },
    favoriteButtonActive: {
      backgroundColor: colors.favorite, 
    },
    favoriteButtonText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '600',
    },
  });