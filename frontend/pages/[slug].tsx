import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Links } from '../types/types';
import Link from 'next/link';

export default function SlugRedirect() {
  const router = useRouter();
  const { slug } = router.query;
  const [link, setLink] = useState<Links | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
   const NEXT_PUBLIC_API_URL = 'http://localhost:8001/api';
  useEffect(() => {
    if (!slug) return;

    const fetchLink = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/links/${slug}`);
        
        if (!response.ok) {
          throw new Error('Link not found');
        }
        
        const data = await response.json();
        setLink(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [slug]);

  if (loading || !slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Link Not Found</title>
        </Head>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Link Not Found</h1>
          <p className="text-gray-600">The requested short link does not exist.</p>
          <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline">
            Back to Link Shortener
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Redirecting...</title>
      </Head>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-2">Redirecting...</h1>
        <p className="text-gray-600">
          You will be redirected to: <br />
          <span className="font-medium">{link?.url}</span>
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            (Note: In a complete implementation, this page would automatically redirect)
          </p>
        </div>
      </div>
    </div>
  );
}