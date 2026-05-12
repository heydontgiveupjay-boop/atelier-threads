import React, { useState } from "react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";

interface ProductGridProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const CATEGORIES = ["All", "Shirts", "Outerwear", "Dresses", "Basics", "Trousers"];

export const ProductGrid: React.FC<ProductGridProps> = ({ onQuickView, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Collection</h2>
          <p className="text-slate-500">Carefully selected pieces for your everyday rotation.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "ghost"}
              className={`rounded-none px-6 ${activeCategory === category ? "bg-slate-900 text-white" : "text-slate-600"}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onQuickView={onQuickView} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};