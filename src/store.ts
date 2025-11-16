import {configureStore, combineReducers} from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import favoritesReducer from './features/favorites/favoritesSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
  products: productsReducer,
  favorites: favoritesReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  
  whitelist: ['products', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;