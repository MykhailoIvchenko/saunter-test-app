import { configureStore } from '@reduxjs/toolkit';
import selectedRouteReducer from '../redux/selectedRoute/selectedRouteSlice';
import routesReducer from '../redux/routes/routesSlice';

export const store = configureStore({
  reducer: {
    selectedRoute: selectedRouteReducer,
    routes: routesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
