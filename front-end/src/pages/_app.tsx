import type { AppProps } from 'next/app';
import Header from '@components/header';  // Zorg ervoor dat het pad klopt
import Footer from '@components/footer';  // Zorg ervoor dat het pad klopt
import '@styles/globals.css'; // Importeer globale CSS

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* Voeg de Header toe bovenaan elke pagina */}
      <Header />

      {/* De inhoud van de pagina */}
      <main>
        <Component {...pageProps} />
      </main>

      {/* Voeg de Footer toe onderaan elke pagina */}
      <Footer />
    </div>
  );
}

export default MyApp;
