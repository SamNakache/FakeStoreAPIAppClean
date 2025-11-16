import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchProducts} from '../../api/productsApi';

export type ProductRating = {
  rate: number;
  count: number;
};
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
};

type ProductsState = {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const products = await fetchProducts();
    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default productsSlice.reducer;