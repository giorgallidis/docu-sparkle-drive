
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onSearchChange: (query: string) => void;
  onViewToggle: () => void;
  isGridView: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSearchChange, 
  onViewToggle,
  isGridView 
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">MediVault</h1>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            Beta
          </span>
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-full bg-background pl-8 focus-visible:ring-blue-500"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={onViewToggle}
          >
            {isGridView ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3" y1="6" y2="6" />
                  <line x1="3" x2="3" y1="12" y2="12" />
                  <line x1="3" x2="3" y1="18" y2="18" />
                </svg>
                List
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                Grid
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
