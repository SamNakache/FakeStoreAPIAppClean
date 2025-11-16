import React, {useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {ProductCard} from '../components/ProductCard';
import {toggleFavorite} from '../features/favorites/favoritesSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from '../components/AppHeader';
import {ThemeColors, useThemeColors} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export const FavoritesScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const products = useSelector((state: RootState) => state.products.items);
  const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle={
          colors.background === '#020617' ? 'light-content' : 'dark-content'
        }
      />
      <View style={styles.container}>
        <AppHeader
          title="Favorites"
          showBack
          onBackPress={() => navigation.goBack()}
        />

        {favoriteProducts.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.text}>No favorites yet.</Text>
          </View>
        ) : (
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={styles.listContent}
            data={favoriteProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProductCard
                product={item}
                isFavorite={true}
                onPress={() =>
                  navigation.navigate('ProductDetails', {productId: item.id})
                }
                onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
              />
            )}
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
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.text,
    },
    listContent: {
      paddingVertical: 8,
    },
  });