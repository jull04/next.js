import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { catApi } from '../utils/api';

// Создаем Redux-хранилище с помощью configureStore
export const store = configureStore({
  reducer: {
    // Добавляем API в редьюсер
    [catApi.reducerPath]: catApi.reducer,
  },
  // Подключаем middleware для работы с API
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware),
});

setupListeners(store.dispatch);