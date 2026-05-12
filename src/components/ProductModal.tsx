import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Product } from "../types";
import { ShoppingBag, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-none border-none">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[3/4] bg-slate-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/90 text-slate-900 hover:bg-white border-none rounded-none px-3 py-1 text-[10px] tracking-widest uppercase">
                New Arrival
              </Badge>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-8">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">{product.category}</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-semibold text-slate-900">${product.price}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3 w-3 fill-slate-900 text-slate-900" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">(24 reviews)</span>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Select Size</label>
                  <button className="text-xs text-slate-500 underline underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`h-12 w-14 flex items-center justify-center border text-sm font-medium transition-all ${
                        selectedSize === size 
                          ? "border-slate-900 bg-slate-900 text-white" 
                          : "border-slate-200 text-slate-600 hover:border-slate-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <Button 
                className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-none text-base font-semibold"
                disabled={!selectedSize}
                onClick={() => {
                  onAddToCart(product, selectedSize);
                  onClose();
                  setSelectedSize("");
                }}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {selectedSize ? "Add to Shopping Bag" : "Select a Size"}
              </Button>
              <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                Free shipping on orders over $150
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};