import React from "react";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { CartItem } from "../types";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="text-xl font-bold tracking-tight text-slate-900 uppercase">
            shop with swago
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900 transition-colors">Shop All</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Collections</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Sustainability</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Journal</a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-600">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-600 hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 relative"
            onClick={onOpenCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};