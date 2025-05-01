import { useEffect } from 'react';

interface UseSearchShortcutsProps {
  openSearch: () => void;
}

/**
 * Hook to handle keyboard shortcuts for search functionality
 * Listens for key combinations like Ctrl+K or Cmd+K to open the search modal
 */
export function useSearchShortcuts({ openSearch }: UseSearchShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K (common search shortcut in many applications)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        openSearch();
      }
      
      // You can add more shortcuts here if needed
      // For example, "/" is often used in many websites to focus the search
      if (
        event.key === '/' && 
        !(event.target instanceof HTMLInputElement) && 
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        openSearch();
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openSearch]);
}
