import React from "react";
import { Product } from "../types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
          <Button 
            className="flex-1 bg-white text-slate-900 hover:bg-slate-100 rounded-none shadow-lg border-none"
            onClick={() => onQuickView(product)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
          <Button 
            className="bg-slate-900 text-white hover:bg-slate-800 rounded-none shadow-lg"
            size="icon"
            onClick={() => onAddToCart(product)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{product.category}</p>
            <h3 className="font-medium text-slate-900 group-hover:text-slate-600 transition-colors">{product.name}</h3>
          </div>
          <span className="font-semibold text-slate-900">${product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};