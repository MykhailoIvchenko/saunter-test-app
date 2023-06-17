import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: RouteForDb | null = {
  dateCreating: 0,
  distance: {
    meters: 0,
    kilometers: 0,
  },
  fullDescription: '',
  id: '',
  isInFavourites: false,
  points: [],
  shortDescription: '',
  title: '',
  userId: '',
};

export const selectedRouteSlice = createSlice({
  name: 'selectedRoute',
  initialState,
  reducers: {
    setRoute: (_state, action) => action.payload,
  },
});

export const selectRoute = (state: RootState) => state.selectedRoute;

export const { setRoute } = selectedRouteSlice.actions;

export default selectedRouteSlice.reducer;
