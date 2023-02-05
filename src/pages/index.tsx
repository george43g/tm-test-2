import Head from 'next/head';
// import Image from 'next/image'
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import MovieCard from '@/components/MovieCard';
import SortAccordion from '@/components/Nav/SortAccordion';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Tiger Mist - Popular Movies Code Test</title>
        <meta name="description" content="Tiger Mist - Popular Movies Code Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={inter.className}>popular movies</h1>
        </header>
        <nav className={styles.nav}>
          <SortAccordion />
        </nav>
        <div>
          <div className="grid grid-cols-5 gap-6">
            {new Array(13).fill(1).map((_, idx) => (
              <MovieCard
                key={idx}
                name="Some movie"
                image="https://images.moviesanywhere.com/6305a9e8ed76d5fa485ac16637655cf7/bcc68be4-eede-409b-a63d-e179b28d19b4.webp?h=375&resize=fit&w=250"
                date="12-12-2022"
                rating="72"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 my-4 ">
            <button className="bg-sky-500 text-white p-2 font-bold text-lg rounded-xl cursor-pointer transition-all hover:bg-sky-600">
              Load more
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
