import Head from 'next/head';
// import Image from 'next/image'
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
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
        <div className={styles.movies}>movies</div>
      </main>
    </>
  );
}
