import Link from "next/link";
import { GiSpaceship } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg">
          🚀 Next.js Applications
        </h1>
        <p className="text-2xl text-gray-200 mb-12">
          Explora nuestras aplicaciones con SSG, ISR y CSR
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Pokémon */}
          <Link
            href="/pokemon"
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition transform hover:scale-105 border-2 border-purple-400 hover:border-purple-300"
          >
            <IoGameController size={80} className="mx-auto mb-4 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white mb-4">Pokédex</h2>
            <p className="text-gray-200">
              Explora los 151 Pokémon originales con ISR y SSG
            </p>
          </Link>

          {/* Card Rick and Morty */}
          <Link
            href="/rickandmorty"
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition transform hover:scale-105 border-2 border-green-400 hover:border-green-300"
          >
            <GiSpaceship size={80} className="mx-auto mb-4 text-green-400" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Rick and Morty
            </h2>
            <p className="text-gray-200">
              Descubre todos los personajes con búsqueda en tiempo real
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}