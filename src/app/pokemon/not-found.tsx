import Link from "next/link";

export default function PokemonNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <h1 className="text-4xl font-bold text-yellow-700">Pokémon no encontrado</h1>
      <p className="mt-4 text-yellow-600">Lo sentimos, no existe este Pokémon.</p>
      <Link
        href="/pokemon"
        className="mt-6 bg-yellow-700 text-white px-4 py-2 rounded"
      >
        Volver al Pokédex
      </Link>
    </div>
  );
}
