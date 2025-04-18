'use client'
import Head from 'next/head';
import { Toaster, toast } from 'react-hot-toast';
import LinkForm from '@/components/LinkForm';
import LinkList from '@/components/LinkList';
import { Links } from '@/types/types'; 
import { useEffect, useState } from 'react';

export default function CreateLink() {
  const NEXT_PUBLIC_API_URL = 'http://localhost:8001/api';
  const [links, setLinks] = useState<Links[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/links`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      toast.error('Failed to load links');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLink = (newLink: Links) => {
    setLinks([newLink, ...links]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <Head>
        <title>Link Shortener</title>
        <meta name="description" content="A simple link shortener application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="top-right" />

      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-600">Link Shortener</h1>
          <p className="text-gray-700 mt-2">Create shortened links with custom slugs</p>
        </header>

        <main className="max-w-lg mx-auto">
          <LinkForm onLinkCreated={addLink} />
          
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Links</h2>
            {isLoading ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Loading links...</p>
              </div>
            ) : (
              <LinkList links={links} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}