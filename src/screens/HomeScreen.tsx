import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  TextInput,
  RefreshControl
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {loadProducts} from '../features/products/productsSlice';
import {toggleFavorite} from '../features/favorites/favoritesSlice';
import {ProductCard} from '../components/ProductCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from '../components/AppHeader';
import {ThemeColors, useThemeColors} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {items, status, error} = useSelector((s: RootState) => s.products);
  const colors = useThemeColors();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const favoriteIds = useSelector((s: RootState) => s.favorites.ids);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = React.useMemo(
    () =>
      items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [items, searchQuery],
  );


  const handleLoad = () => {
    dispatch(loadProducts());
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadProducts());
    }
  }, [dispatch, status]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
      barStyle= 'light-content'
    />
      <View style={styles.container}>
        <AppHeader
  title="Product Explorer"
  subtitle="Browse items from FakeStoreAPI"
  rightContent={
    <View style={styles.headerButtons}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleLoad}
        activeOpacity={0.8}>
        <Text style={styles.iconButtonText}>↻ Reload</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconButton, styles.favoritesButton]}
        onPress={() => navigation.navigate('Favorites')}
        activeOpacity={0.8}>
        <Text style={styles.iconButtonText}>❤ {favoriteIds.length}</Text>
      </TouchableOpacity>
    </View>
  }
/>

<View style={styles.searchContainer}>
  <View style={styles.searchInputWrapper}>
    <TextInput
      value={searchQuery}
      onChangeText={setSearchQuery}
      placeholder="Search products..."
      placeholderTextColor={colors.textMuted}
      style={styles.searchInput}
    />

    {searchQuery.length > 0 && (
      <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
        <Text style={styles.clearIcon}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
</View>

        {status === 'loading' && items.length === 0 && (
        <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.statusText}>Loading products…</Text>
        </View>
        )}

        {status === 'failed' && (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              Failed to load products
              {error ? `: ${error}` : ''}
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleLoad}
              activeOpacity={0.8}>
              <Text style={styles.retryButtonText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}

        {(status === 'succeeded' || status === 'loading') && (
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProductCard
                product={item}
                isFavorite={favoriteIds.includes(item.id)}
                onPress={() =>
                  navigation.navigate('ProductDetails', {productId: item.id})
                }
                onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
              />
            )}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={status === 'loading'}
                onRefresh={handleLoad}
                tintColor={colors.text}          
                titleColor={colors.textMuted}    
              />
            }
          />
        )}
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
      backgroundColor: colors.background,
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: colors.primaryButton,
      marginLeft: 8,
    },
    favoritesButton: {
      backgroundColor: colors.favorite,
    },
    iconButtonText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '600',
    },
    listContent: {
      paddingVertical: 8,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    statusText: {
      marginTop: 8,
      color: colors.textMuted,
    },
    errorText: {
      textAlign: 'center',
      color: colors.favorite,
      marginBottom: 12,
    },
    retryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.primaryButton,
    },
    retryButtonText: {
      color: '#ffffff',
      fontWeight: '600',
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },

    searchInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: 999,
      paddingHorizontal: 14,
    },

    searchInput: {
      flex: 1,
      paddingVertical: 8,
      color: colors.text,
      fontSize: 14,
    },

    clearButton: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.textMuted + '33', 
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },

    clearIcon: {
      color: colors.text,      
      fontSize: 14,
      fontWeight: '600',
      marginTop: 1,           
      marginLeft: 1,
    },
  });