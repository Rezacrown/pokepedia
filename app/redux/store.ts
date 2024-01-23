import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { pokemonQuery } from "./query";
import { pokemonPaginate } from "./paginate";

export const store = () => {
  return configureStore({
    reducer: {
      pokemonQuery: pokemonQuery.reducer,
      pokemonPaginate: pokemonPaginate.reducer,
    },
  });
};

const listener = createListenerMiddleware({
  extra: {
    getData: () => {},
  },
});

// listener.startListening({a})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
