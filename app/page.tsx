import Link from "next/link";
import { getAllPokemon } from "./utils";
import Image from "next/image";
import Breadcrumb from "./components/Breadcrumb";
import Pagination from "./components/Pagination";

//
export default async function Home({
  searchParams,
}: {
  searchParams: { [x: string]: string };
}) {
  const currentPage = Number(searchParams.page) || 1;

  const data: PokemonDatas = await getAllPokemon({
    limit: 20,
    offset: currentPage > 1 ? currentPage * 20 : 0,
  });

  return (
    <>
      <Breadcrumb />

      <div className="text-black text-lg mb-6">
        Total pokemon: <span className="font-semibold">{data.count}</span>{" "}
      </div>

      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5">
          {data!.results.map((item, idx) => {
            return (
              <div key={idx} className="card border shadow shadow-[#FFEEB0]">
                <div className="card-body text-center">
                  <div className="image-full mx-auto">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        currentPage * (idx + 1)
                      }.png`}
                      alt=""
                      height={80}
                      width={80}
                      priority
                    />
                  </div>

                  <Link
                    href={`/${item.name.toLowerCase()}`}
                    className="text-red-600"
                  >
                    <h2>{item.name.toLowerCase()}</h2>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Pagination
        totalPage={data.count / 20}
        currentPage={currentPage > 1 ? currentPage : 1}
      />
    </>
  );
}

type PokemonDatas = {
  count: number;
  next: null | string;
  previous: null | string;
  results: { name: string; url: string }[];
};
