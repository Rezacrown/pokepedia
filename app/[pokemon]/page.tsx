import Image from "next/image";
import { getPokemonDetail } from "../utils";
import { stat } from "fs";
import Breadcrumb from "../components/Breadcrumb";

export default async function PokemonDetail({
  params,
}: {
  params: { pokemon: string };
}) {
  const data = (await getPokemonDetail(params.pokemon)) as PokemonDetailData;

  const [keyStat, valueStat] = data.stats.filter((item) => {
    return {
      key: Object.entries(item)[0],
      value: Object.entries(item)[1],
    };
  });

  //   console.log({ data: data.stats[0].stat.name });

  return (
    <>
      <Breadcrumb
        secondBreadcrumb={{ title: params.pokemon, href: `/${params.pokemon}` }}
      />
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-x-2">
          <div className="mx-5 md:mx-auto">
            <Image
              src={data?.sprites?.front_default}
              alt=""
              width={300}
              height={300}
              className="border rounded-md"
            />
          </div>
          <div className="flex mt-10 md:mt-5 mx-5 md:mx-auto items-center md:items-start md:text-left flex-col">
            <div className="card w-[300px] py-8 md:w-[500px] px-8 shadow shadow-[#419EAE]">
              <h4 className="font-bold text-2xl mx-auto">Stats:</h4>
              <br />

              {data.stats.map((item) => (
                <>
                  {Object.entries(item).map(([key, val], idx) => {
                    return (
                      <>
                        {key === "stat" && (
                          <h6
                            key={idx}
                            className="text-sm md:text-lg font-bold text-gray-900 my-2"
                          >
                            {key == "stat" && val.name + ": "}{" "}
                            <span className="font-normal text-purple-400 mx-5">
                              {item.base_stat} / 200
                            </span>
                            <progress
                              className="progress progress-accent w-44 md:w-full "
                              value={item.base_stat}
                              max="200"
                            />
                          </h6>
                        )}
                      </>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type PokemonDetailData = {
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
  };
  stats: stats[];
  moves: [];
};

type stats = {
  base_stat: number;
  effort: number;
  stat: any;
};
