import { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { Links, ApiError } from '../types/types';

interface LinkFormProps {
  onLinkCreated: (link: Links) => void;
}

export default function LinkForm({ onLinkCreated }: LinkFormProps) {
  const [url, setUrl] = useState<string>('');
  const [customSlug, setCustomSlug] = useState<string>('');
  const [useCustomSlug, setUseCustomSlug] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const NEXT_PUBLIC_API_URL = 'http://localhost:8001/api';
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          slug: useCustomSlug ? customSlug : '',
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorData = data as ApiError;
        throw new Error(errorData.error || 'Failed to create link');
      }
      
      onLinkCreated(data as Links);
      toast.success('Link created successfully!');
      
      // Reset form
      setUrl('');
      setCustomSlug('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL to shorten
          </label>
          <input
            type="text"
            id="url"
            placeholder="https://example.com/very-long-url-that-needs-shortening"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useCustomSlug"
              checked={useCustomSlug}
              onChange={() => setUseCustomSlug(!useCustomSlug)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="useCustomSlug" className="ml-2 block text-sm text-gray-700">
              Use custom slug
            </label>
          </div>
        </div>
        
        {useCustomSlug && (
          <div className="mb-4">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
              Custom slug (min 4 characters)
            </label>
            <input
              type="text"
              id="customSlug"
              placeholder="my-custom-slug"
              value={customSlug}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              minLength={4}
              pattern="[a-zA-Z0-9-_]+"
              title="Only letters, numbers, hyphens and underscores are allowed"
              required={useCustomSlug}
            />
            <p className="mt-1 text-xs text-gray-500">
              Only letters, numbers, hyphens and underscores allowed
            </p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>
    </div>
  );
}