"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuery as getQueryPokemon } from "../redux/query";

export default function Navbar() {
  const dispach = useDispatch();
  const queryPokemon = useSelector(
    (state: any) =>
      state.pokemonQuery as {
        keyQuery: string | "pokemon";
        valQuery: string;
      }
  );

  const [searching, setSearching] = useState(queryPokemon.valQuery);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(e.target.value);
    dispach(
      getQueryPokemon({
        keyQuery: "pokemon",
        valQuery: e.target.value,
      })
    );
  };

  return (
    <div className="navbar bg-base-100 justify-center">
      <div className="flex">
        <Link href={"/"} className="btn btn-ghost text-xl">
          <h3 className="text-[#FAAA6D]">
            Poke<span className="text-[#F2684A]">Pedia</span>
          </h3>
        </Link>
      </div>
      <div className="flex-none ml-8 gap-2">
        <div className="form-control">
          <input
            name="searching"
            type="text"
            value={searching}
            onChange={(e) => handleChangeSearch(e)}
            placeholder="Pikachu, Charizard, etc.."
            className="input input-bordered w-44 md:w-auto input-accent"
          />
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <input
          type="checkbox"
          value="dark"
          className="toggle theme-controller"
        />
      </div>
    </div>
  );
}
