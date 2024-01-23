"use client";
import { useRef } from "react";
import { Provider } from "react-redux";

import { store, AppStore } from "../redux/store";
import { getQuery as getQueryPokemon } from "../redux/query";
import { getMorePaginate } from "../redux/paginate";

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
    storeRef.current.dispatch(
      getMorePaginate({
        limit: 20,
        offset: 0,
      })
    );
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
