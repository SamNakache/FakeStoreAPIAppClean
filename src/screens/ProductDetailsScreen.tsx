import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {toggleFavorite} from '../features/favorites/favoritesSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from '../components/AppHeader';
import {ThemeColors, useThemeColors} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export const ProductDetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const {productId} = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === productId),
  );
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.ids.includes(productId),
  );

  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar
          barStyle={
            colors.background === '#020617' ? 'light-content' : 'dark-content'
          }
        />
        <View style={styles.container}>
          <AppHeader
            title="Product Details"
            showBack
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.center}>
            <Text style={styles.text}>Product not found.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle={
          colors.background === '#020617' ? 'light-content' : 'dark-content'
        }
      />
      <View style={styles.container}>
        <AppHeader
          title="Product Details"
          showBack
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Image source={{uri: product.image}} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          {product.rating && (
            <Text style={styles.rating}>
              ⭐ {product.rating.rate.toFixed(1)} / 5 · {product.rating.count} ratings
            </Text>
          )}

          <Text style={styles.description}>{product.description}</Text>

          <TouchableOpacity
                    onPress={() => dispatch(toggleFavorite(product.id))}
                    style={[
                      styles.favoriteButton,
                      isFavorite && styles.favoriteButtonActive,
                    ]}
                    activeOpacity={0.8}>
                    <Text style={styles.favoriteButtonText}>
                      {isFavorite ? 'Remove favorite' : 'Add favorite'}
                    </Text>
                  </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.headerBackground,
    },
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    content: {
      padding: 16,
      alignItems: 'center',
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.text,
    },
    image: {
      width: 220,
      height: 220,
      marginBottom: 16,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 8,
      textAlign: 'center',
      color: colors.text,
    },
    price: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 8,
      color: colors.text,
    },
    rating: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 24,
      color: colors.text,
    },
    favoriteButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: colors.primaryButton, 
      marginTop: 2,
      alignItems: 'center',
    },
    favoriteButtonActive: {
      backgroundColor: colors.favorite, 
    },
    favoriteButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
    },
  });