import Breadcrumb from "./components/Breadcrumb";
import PokemonList from "./components/PokemonList";
import { getDataPaginate } from "./redux/paginate";

import { store } from "./redux/store";

export default async function Home() {
  // initial redux store in server component
  const globalStore = store();

  // initial dispatch event in server component
  async function getStateFromServer() {
    // "use server";

    const limit = globalStore.getState().pokemonPaginate.limit;

    const response = globalStore.dispatch(
      getDataPaginate({
        limit: limit || globalStore.getState().pokemonPaginate.limit || 20,
        offset: 0,
      })
    );

    return response;
  }

  // const data = globalStore.getState().pokemonPaginate.data;

  // get data fetching from store redux
  const data = (await getStateFromServer()).payload as PokemonDatas;

  return (
    <>
      <Breadcrumb />

      <h2>limit: {data.results.length}</h2>

      <div className="text-black text-lg mb-6">
        Total pokemon:{" "}
        <span className="font-semibold">{data?.count ? data.count : 0}</span>{" "}
      </div>

      {data?.results && <PokemonList results={data.results as any} />}
    </>
  );
}

export type PokemonDatas = {
  count: number;
  next: null | string;
  previous: null | string;
  results: { name: string; url: string }[];
};
