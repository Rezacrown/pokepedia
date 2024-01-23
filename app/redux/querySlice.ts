import { createSlice } from "@reduxjs/toolkit";

export const pokemonQuery = createSlice({
  name: "pokemonQuery",
  initialState: {
    keyQuery: "pokemon",
    valQuery: "",
  },
  reducers: {
    getQuery(state, action) {
      const payload = action.payload as typeof state;

      state.keyQuery = payload.keyQuery;
      state.valQuery = payload.valQuery;

      //   console.log({ payload });

      return state;
    },
  },
});

export const { getQuery } = pokemonQuery.actions;
