import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center p-6 bg-cover bg-center relative" style={{ backgroundImage: 'url("/images/cinema-bg.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <h1 className="text-5xl font-bold text-white relative z-10 mb-4">
          Welcome to Cinescope
        </h1>
        <p className="text-xl text-gray-300 mb-8 relative z-10">
          Discover, Rate, and Explore Movies in a Beautiful Cinematic Library
        </p>
        <Link href="/movie" className="relative z-10 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg transition">
          Start Exploring
        </Link>
      </section>

      {/* What is Cinescope Section */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-8">
            What is Cinescope?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Cinescope is your ultimate film library app where you can discover the world of cinema, rate movies, and access detailed information on every film you love (or want to watch). Whether you're a movie buff or just getting started, Cinescope is designed to make your cinematic journey easier and more enjoyable.
          </p>
          <Link href="/movie" className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg transition">
            Explore Now
          </Link>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Film Library</h3>
              <p className="text-gray-300">
                Browse an extensive library of movies and series from all genres, eras, and regions. Cinescope brings the cinema to your fingertips.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Rate Your Movies</h3>
              <p className="text-gray-300">
                Share your opinions with others by rating movies on a 5-star scale and leave reviews to help others decide what to watch.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">In-Depth Movie Information</h3>
              <p className="text-gray-300">
                Get all the details you need about any movie: plot, cast, reviews, trailers, and more. All in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Discover?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Dive into the world of movies and start rating and exploring today. Cinescope is your go-to platform for everything cinema.
          </p>
          <Link href="/movie" className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg transition">
            Explore the Library
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
