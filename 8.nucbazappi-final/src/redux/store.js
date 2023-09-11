import { combineReducers, configureStore } from '@reduxjs/toolkit';
import recommendedReducer from './recommended/recommendedSlice';
import categoriesReducer from './categories/categoriesSlice';
import productsReducer from './products/productsSlice';
import cartReducer from './cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import userReducer from './user/userSlice';
import ordersReducer from './orders/ordersSlice';

const reducers = combineReducers({
  recommended: recommendedReducer,
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
  orders: ordersReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
