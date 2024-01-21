const BASE_URL = "https://pokeapi.co/api/v2";

export const getAllPokemon = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  try {
    const res = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      {
        cache: "no-store",
        next: {
          revalidate: false,
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPokemonDetail = async (name: string) => {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`, {
      cache: "force-cache",
      next: {
        revalidate: false,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
