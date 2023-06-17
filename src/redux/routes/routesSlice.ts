import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { routesService } from "../../services/routesService";

const initialState: RoutesState = {
  routes: [],
  status: 'idle',
};

export const getRoutes = createAsyncThunk(
  'routes/get',
  async () => {
    const routes = await routesService.getRoutesFromDb();

    return routes;
  },
);

export const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutesLocally: (state, action) => {
      state.status = 'idle';
      state.routes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoutes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.routes = action.payload;
      })
      .addCase(getRoutes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectRoutes = (state: RootState) => state.routes;

export const { setRoutesLocally } = routeSlice.actions;

export default routeSlice.reducer;
