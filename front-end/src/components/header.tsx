import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white text-black py-6 px-12 w-full flex justify-between items-center shadow-xl">
      <div className="logo flex items-center space-x-6">
        <img src="/posters/logo_cinescope.jpg" alt="Cinescope Logo" className="h-12" />
        <h1 className="text-4xl font-extrabold tracking-wide text-black">Cinescope</h1>
      </div>
      <nav>
        <ul className="flex space-x-12">
          <li>
            <Link href="/" className="text-lg font-semibold hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">Home</Link>
          </li>
          <li>
            <Link href="/movie" className="text-lg font-semibold hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">Movies</Link>
          </li>
          <li>
            <Link href="/login" className="text-lg font-semibold hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">Login</Link>
          </li>
          <li>
            <Link href="/register" className="text-lg font-semibold hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
