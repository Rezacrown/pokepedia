/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import { getDataPaginate } from "../redux/paginateSlice";
import { AppDispatch, RootState } from "../redux/store";

export default function PokemonList({
  results,
}: {
  readonly results: { name: string; url?: string }[];
}) {
  const dispach = useDispatch<AppDispatch>();

  const pokemonQuery = useSelector((state: RootState) => state.pokemonQuery);
  const paginateData = useSelector((state: RootState) => state.pokemonPaginate);

  const [pokemon, setPokemon] = useState<typeof results>([]);

  const getMoreData = () => {
    dispach(
      getDataPaginate({
        limit: paginateData.limit + 20,
        offset: 0,
      })
    );
  };

  useEffect(() => {
    const data = paginateData.data.results.length
      ? paginateData.data.results
      : results;
    // console.log({ data });
    setTimeout(() => {
      setPokemon(data);
    }, 500);
  }, [results, paginateData]);

  return (
    <>
      <InfiniteScroll
        dataLength={paginateData.data.results.length}
        hasMore={paginateData.hasMore}
        next={() => getMoreData()}
        loader={<h2 className="font-bold my-10">Loading...</h2>}
        // height={"500px"}
        endMessage={
          <div className="w-max text-center mt-5 mb-2 col-span-12 md:col-span-2 mx-auto rounded-xl py-2 px-4 bg-indigo-800">
            <h2 className="font-semibold text-xl text-white">
              data already set
            </h2>
          </div>
        }
        className="grid grid-cols-2 md:grid-cols-4 mb-20 gap-y-5 gap-x-4 mt-20  w-full"
      >
        {pokemon?.map((item, idx) => {
          if (pokemon[idx]?.name.includes(pokemonQuery.valQuery || "")) {
            if (paginateData.limit <= paginateData.data.count + 20)
              return (
                <div key={idx} className="card border shadow shadow-[#FFEEB0]">
                  <div className="card-body text-center">
                    <div className="image-full mx-auto">
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          idx + 1
                        }.png`}
                        alt=""
                        height={80}
                        width={80}
                        priority
                      />
                    </div>

                    <Link
                      href={{
                        pathname: `/${item.name.toLowerCase()}`,
                      }}
                      className="text-red-600"
                    >
                      <h2>{item.name.toLowerCase()}</h2>
                    </Link>
                  </div>
                </div>
              );
          }
        })}
      </InfiniteScroll>
    </>
  );
}
