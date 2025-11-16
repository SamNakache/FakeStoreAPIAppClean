# FakeStoreAPIApp

React Native technical assignment for BayBridge Digital.

## Features

- Fetch products from https://fakestoreapi.com
- Product list with rating, price, image
- Product details screen
- Favorites with Redux Toolkit
- Favorites persisted across app launches (AsyncStorage)
- Pull-to-refresh on product list
- Search bar with live filtering
- Light / Dark theme support
- Haptic feedback when toggling favorites

## Tech stack

- React Native 0.82
- TypeScript
- Redux Toolkit + React Redux
- React Navigation (Native Stack)
- AsyncStorage
- React Native Safe Area Context

## How to run

```bash
# Install deps
npm install

# iOS – from project root
cd ios
pod install
cd ..

# Start Metro
npm start

# In another terminal
npm run ios
```
