// src/app/rickandmorty/[id]/not-found.tsx
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function CharacterNotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8">
      <div className="max-w-md mx-auto text-center bg-gray-800 rounded-2xl p-8 border-2 border-red-500">
        <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-red-400 mb-4">
          Personaje no encontrado
        </h2>
        <p className="text-gray-300 mb-6">
          Este personaje no existe en la base de datos de Rick and Morty.
        </p>
        <Link
          href="/rickandmorty"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          ← Volver a la lista
        </Link>
      </div>
    </div>
  );
}