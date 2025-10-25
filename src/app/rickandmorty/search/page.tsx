"use client"; // ✅ CLIENT SIDE RENDERING

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Character, CharacterResponse } from "@/types/rickandmorty";
import { FaSearch, FaHeart, FaSkull, FaQuestion } from "react-icons/fa";

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

export default function SearchPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchSpecies, setSearchSpecies] = useState("");

  // ✅ useEffect para buscar en tiempo real
  useEffect(() => {
    const searchCharacters = async () => {
      setLoading(true);

      const params = new URLSearchParams();
      if (searchName) params.append("name", searchName);
      if (searchStatus) params.append("status", searchStatus);
      if (searchGender) params.append("gender", searchGender);
      if (searchSpecies) params.append("species", searchSpecies);

      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?${params.toString()}`
        );

        if (res.ok) {
          const data: CharacterResponse = await res.json();
          setCharacters(data.results);
        } else {
          setCharacters([]);
        }
      } catch (error) {
        console.error("Error buscando personajes:", error);
        setCharacters([]);
      }

      setLoading(false);
    };

    // Debounce: esperar 500ms después de que el usuario deje de escribir
    const timer = setTimeout(() => {
      searchCharacters();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchName, searchStatus, searchGender, searchSpecies]);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          🔍 Buscar Personajes en Tiempo Real
        </h1>
        <p className="text-gray-300 text-center mb-8">
          (Client Side Rendering - CSR)
        </p>

        {/* Filtros de búsqueda */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-white mb-2 font-semibold">
                <FaSearch className="inline mr-2" />
                Nombre
              </label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-white mb-2 font-semibold">
                Estado
              </label>
              <select
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
              >
                <option value="">Todos</option>
                <option value="alive">Vivo</option>
                <option value="dead">Muerto</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-white mb-2 font-semibold">
                Género
              </label>
              <select
                value={searchGender}
                onChange={(e) => setSearchGender(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
              >
                <option value="">Todos</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="genderless">Sin género</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>

            {/* Species */}
            <div>
              <label className="block text-white mb-2 font-semibold">
                Especie
              </label>
              <input
                type="text"
                value={searchSpecies}
                onChange={(e) => setSearchSpecies(e.target.value)}
                placeholder="Ej: Human, Alien..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-white text-xl mb-8">
            🔄 Buscando personajes...
          </div>
        )}

        {/* Resultados */}
        {!loading && characters.length === 0 && (
          <div className="text-center text-gray-400 text-xl">
            😔 No se encontraron personajes
          </div>
        )}

        {!loading && characters.length > 0 && (
          <>
            <p className="text-green-400 text-center mb-6">
              {characters.length} personajes encontrados
            </p>

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
          </>
        )}
      </div>
    </div>
  );
}