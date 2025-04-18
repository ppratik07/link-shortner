import { toast } from 'react-hot-toast';
import { Links } from '../types/types';

interface LinkListProps {
  links: Links[];
}

export default function LinkList({ links }: LinkListProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
      console.error('Copy to clipboard failed:', error);
    }
  };

  if (links.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No links created yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {links.map((link) => {
          // In a real implementation, this would be your API/redirect URL
          const shortUrl = `${window.location.origin}/r/${link.slug}`;
          
          return (
            <li key={link.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {shortUrl}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {link.url}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}