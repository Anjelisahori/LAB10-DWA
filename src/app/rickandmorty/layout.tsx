import { ReactNode } from "react";
import { Metadata } from "next";
import { GiSpaceship } from "react-icons/gi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty - Characters",
  description: "Explora todos los personajes de Rick and Morty",
};

interface RickAndMortyLayoutProps {
  children: ReactNode;
}

export default function RickAndMortyLayout({ children }: RickAndMortyLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-800 to-blue-900">
      <nav className="bg-black bg-opacity-40 backdrop-blur-sm sticky top-0 z-50 border-b-2 border-green-400">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/rickandmorty"
            className="text-white text-2xl font-bold hover:text-green-400 transition flex items-center gap-2"
          >
            <GiSpaceship size={35} className="text-green-400" />
            <span>Rick and Morty Universe</span>
          </Link>
          
          <Link
            href="/rickandmorty/search"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            🔍 Buscar Personajes
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}