import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PokemonDatas } from "../page";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonPaginate = createSlice({
  name: "pokemonQuery",
  initialState: {
    limit: 20,
    offset: 0,
    hasMore: true,
    data: {
      count: 0,
      next: "",
      previous: "",
      results: [],
    } as PokemonDatas,
  },
  reducers: {
    getMorePaginate: (state, action) => {
      const payload = action.payload as typeof state;

      state.limit = payload.limit;
      state.offset = payload.offset;

      console.log({ payload });

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataPaginate.fulfilled, (state, action) => {
      state.limit = action.meta.arg.limit;
      // state.limit = state.limit + 20;
      state.offset = action.meta.arg.offset;

      // console.log({ payload: action.payload });
      if (action.payload && action.payload.results.length < 1302) {
        state.data.results = action.payload.results;
        // console.log({ state: state.data });
      } else {
        state.hasMore = false;
      }

      return state;
    });
  },
});

// asycn action
export const getDataPaginate = createAsyncThunk(
  "pokemon/paginate",
  async (args: { offset: number; limit: number }, action) => {
    try {
      const res = await fetch(
        `${BASE_URL}/pokemon?offset=${args.offset}&limit=${args.limit}`,
        {
          cache: "force-cache",
          next: {
            revalidate: false,
          },
        }
      );
      const data = (await res.json()) as Awaited<PokemonDatas>;

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const { getMorePaginate } = pokemonPaginate.actions;
