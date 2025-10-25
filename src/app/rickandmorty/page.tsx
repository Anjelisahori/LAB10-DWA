import Link from "next/link";
import Image from "next/image";
import { Character, CharacterResponse } from "@/types/rickandmorty";
import { FaUser, FaHeart, FaSkull, FaQuestion } from "react-icons/fa";

// Función para obtener TODOS los personajes
async function getAllCharacters(): Promise<Character[]> {
  const allCharacters: Character[] = [];
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`,
      {
        cache: "force-cache", // ✅ FORZAR CACHÉ (SSG)
      }
    );

    if (!res.ok) break;

    const data: CharacterResponse = await res.json();
    allCharacters.push(...data.results);

    hasMorePages = data.info.next !== null;
    page++;
  }

  return allCharacters;
}

// Función para obtener el ícono según el estado
function getStatusIcon(status: string) {
  switch (status) {
    case "Alive":
      return <FaHeart className="text-green-500" />;
    case "Dead":
      return <FaSkull className="text-red-500" />;
    default:
      return <FaQuestion className="text-gray-500" />;
  }
}

export default async function RickAndMortyPage() {
  const characters = await getAllCharacters();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🌌 Todos los Personajes
          </h1>
          <p className="text-green-300 text-xl">
            {characters.length} personajes encontrados
          </p>
          <p className="text-gray-300 text-sm mt-2">
            (Generado con SSG - Static Site Generation)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="transform transition hover:scale-105"
            >
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-green-400">
                <div className="relative">
                  <Image
                    width={300}
                    height={300}
                    src={character.image}
                    alt={character.name}
                    className="w-full h-64 object-cover"
                    loading="lazy" // ✅ LAZY LOADING
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 p-2 rounded-full">
                    {getStatusIcon(character.status)}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2 truncate">
                    {character.name}
                  </h2>
                  <p className="text-green-400 text-sm">
                    {character.species}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {character.status} - {character.gender}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}