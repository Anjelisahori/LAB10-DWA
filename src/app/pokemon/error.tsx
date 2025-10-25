'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IoAlertCircleOutline } from 'react-icons/io5';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-600 to-purple-700 text-white text-center p-8">
      <IoAlertCircleOutline size={80} className="mb-6 text-yellow-300" />
      <h1 className="text-4xl font-bold mb-4">¡Ups! Ocurrió un error 😢</h1>
      <p className="text-lg mb-6">{error.message || 'Algo salió mal al cargar los Pokémon.'}</p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition"
        >
          Reintentar
        </button>

        <Link
          href="/pokemon"
          className="bg-white text-purple-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
        >
          Volver al Pokédex
        </Link>
      </div>
    </div>
  );
}
