"use client";
import Head from 'next/head';
import DynamicForm from './components/forms/DynamicForm';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <div className="bg-gray-800 text-gray-900 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Dynamic Form</title>
        <meta name="Prueba" content="Test formulario dinámico <3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <DynamicForm />
      </main>
      <Footer />
    </div>
  );
}
