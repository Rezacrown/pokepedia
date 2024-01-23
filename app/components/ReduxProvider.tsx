"use client";
import { useRef } from "react";
import { Provider } from "react-redux";

import { store, AppStore } from "../redux/store";
import { getQuery as getQueryPokemon } from "../redux/querySlice";
import { getDataPaginate } from "../redux/paginateSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
    storeRef.current.dispatch(
      getQueryPokemon({
        keyQuery: "pokemon",
        valQuery: "",
      })
    );
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
