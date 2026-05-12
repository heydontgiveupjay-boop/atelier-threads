import React from 'react';
import { CartItem } from '../types';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l bg-background shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold">Your Shopping Cart</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-emerald-50 p-6 text-emerald-600">
                      <ShoppingBag className="h-10 w-10" />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-semibold line-clamp-1">{item.name}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="mb-2 text-sm font-bold text-emerald-700">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <div className="mt-auto flex items-center gap-2">
                            <div className="flex items-center rounded-lg border bg-muted/50">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none"
                                onClick={() => onUpdateQuantity(item.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none"
                                onClick={() => onUpdateQuantity(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t bg-emerald-50/30 px-6 py-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <Separator className="bg-emerald-100" />
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-orange-600 py-6 text-base font-bold text-white hover:bg-orange-700"
                    onClick={onCheckout}
                  >
                    Checkout Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Free shipping on orders over $150
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};