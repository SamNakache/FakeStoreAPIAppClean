import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {ProductDetailsScreen} from '../screens/ProductDetailsScreen';
import {FavoritesScreen} from '../screens/FavoritesScreen';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: {productId: number};
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{title: 'Product Details'}}
        />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};