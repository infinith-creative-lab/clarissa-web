import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icon';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Simple logic to show pages. For enterprise grade, we'd add ellipsis (...) but for 12 items limit and small mock data, 
  // we'll keep it simple or implement a basic sliding window if totalPages > 7.
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return pages.map(renderPageButton);
    }

    const visiblePages = [];
    if (currentPage <= 4) {
      visiblePages.push(...pages.slice(0, 5), '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      visiblePages.push(1, '...', ...pages.slice(totalPages - 5));
    } else {
      visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return visiblePages.map((page, index) => 
      typeof page === 'number' 
        ? renderPageButton(page) 
        : <span key={`dots-${index}`} className="px-2 text-neutral-300 font-heading">...</span>
    );
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={cn(
        "relative min-w-[40px] h-10 text-[13px] font-heading font-medium tracking-widest transition-all duration-300 cursor-pointer",
        currentPage === page 
          ? "text-neutral-900 border-b-2 border-neutral-900" 
          : "text-neutral-400 hover:text-neutral-900"
      )}
    >
      {page.toString().padStart(2, '0')}
    </button>
  );

  return (
    <nav className={cn("flex items-center justify-center gap-4 py-12", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer",
          currentPage === 1 ? "text-neutral-200" : "text-neutral-900 hover:text-brand-600"
        )}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer",
          currentPage === totalPages ? "text-neutral-200" : "text-neutral-900 hover:text-brand-600"
        )}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
}
