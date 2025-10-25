import Link from "next/link";
import Image from "next/image";
import { Character, CharacterResponse } from "@/types/rickandmorty";
import { Metadata } from "next";
import { FaArrowLeft, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { notFound } from "next/navigation";

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

// ✅ Retorna null si no existe, NO lanza error
async function getCharacter(id: string): Promise<Character | null> {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
      next: { revalidate: 864000 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    return null;
  }
}

// ✅ Generar SOLO rutas válidas
export async function generateStaticParams() {
  const validCharacters: { id: string }[] = [];
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      if (!res.ok) break;

      const data: CharacterResponse = await res.json();

      validCharacters.push(
        ...data.results.map((character) => ({
          id: character.id.toString(),
        }))
      );

      hasMorePages = data.info.next !== null;
      page++;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  console.log(`✅ Generated ${validCharacters.length} static routes`);
  return validCharacters;
}

// ✅ Metadata con manejo de null
export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);

  if (!character) {
    return {
      title: "Personaje no encontrado - Rick and Morty",
      description: "Este personaje no existe",
    };
  }

  return {
    title: `${character.name} - Rick and Morty`,
    description: `Información sobre ${character.name}: ${character.species}, ${character.status}`,
  };
}

function getStatusColor(status: string): string {
  switch (status) {
    case "Alive":
      return "bg-green-500";
    case "Dead":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  // ✅ Si es null, llamar a notFound()
  if (!character) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/rickandmorty"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-6 transition"
        >
          <FaArrowLeft />
          <span className="font-semibold">Volver a la lista</span>
        </Link>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-green-400">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              {character.name}
            </h1>
            <p className="text-white text-lg">ID: #{character.id}</p>
            <p className="text-gray-200 text-sm mt-2">
              (Página generada con ISR - Revalidación cada 10 días)
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex justify-center items-start">
                <div className="relative">
                  <Image
                    width={400}
                    height={400}
                    src={character.image}
                    alt={character.name}
                    className="rounded-xl shadow-lg border-4 border-green-400"
                    priority
                  />
                  <div
                    className={`absolute top-4 right-4 ${getStatusColor(
                      character.status
                    )} text-white px-4 py-2 rounded-full font-bold shadow-lg`}
                  >
                    {character.status}
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-white">
                <div className="bg-gray-700 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4 text-green-400">
                    📋 Información Básica
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-300">
                        Nombre:
                      </span>
                      <p className="text-lg">{character.name}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-300">
                        Estado:
                      </span>
                      <p className="text-lg">{character.status}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-300">
                        Especie:
                      </span>
                      <p className="text-lg">{character.species}</p>
                    </div>
                    {character.type && (
                      <div>
                        <span className="font-semibold text-gray-300">
                          Tipo:
                        </span>
                        <p className="text-lg">{character.type}</p>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-300">
                        Género:
                      </span>
                      <p className="text-lg">{character.gender}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2">
                    <FaMapMarkerAlt /> Ubicación
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-300 flex items-center gap-2">
                        <FaGlobe /> Origen:
                      </span>
                      <p className="text-lg">{character.origin.name}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-300 flex items-center gap-2">
                        <FaMapMarkerAlt /> Última ubicación conocida:
                      </span>
                      <p className="text-lg">{character.location.name}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4 text-green-400">
                    📺 Episodios
                  </h2>
                  <p className="text-lg">
                    Aparece en{" "}
                    <span className="font-bold text-green-400">
                      {character.episode.length}
                    </span>{" "}
                    episodios
                  </p>
                </div>

                <div className="bg-gray-700 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4 text-green-400">
                    🕐 Información adicional
                  </h2>
                  <div>
                    <span className="font-semibold text-gray-300">
                      Creado en la API:
                    </span>
                    <p className="text-lg">
                      {new Date(character.created).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-6 text-center">
            <Link
              href="/rickandmorty"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              ← Volver al listado completo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}