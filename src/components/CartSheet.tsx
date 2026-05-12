import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import { CartItem } from "../types";
import { Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { Separator } from "./ui/separator";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onCheckout: () => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-0">
        <SheetHeader className="p-6 border-b border-slate-100 flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-xl font-bold tracking-tight">Shopping Bag</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Your bag is empty</h3>
              <p className="text-slate-500 mb-8 max-w-[200px]">Looks like you haven't added anything to your bag yet.</p>
              <Button 
                variant="outline" 
                className="rounded-none border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="p-6 flex gap-4">
                  <div className="h-24 w-20 bg-slate-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-slate-900 text-sm">{item.name}</h4>
                      <button 
                        onClick={() => onRemoveItem(item.id, item.selectedSize)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">Size: {item.selectedSize}</p>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-slate-200">
                        <button 
                          className="p-1 px-2 hover:bg-slate-50 text-slate-500"
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          className="p-1 px-2 hover:bg-slate-50 text-slate-500"
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-sm">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <Button 
              className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-none text-base font-semibold"
              onClick={onCheckout}
            >
              Checkout Now
            </Button>
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
              Secure checkout powered by ESSENCE
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};