import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CartItem } from "../types";
import { ChevronLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface CheckoutFormProps {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal > 150 ? 0 : 15);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      toast.success("Order placed successfully!");
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 1 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>1</div>
              <div className="h-px flex-1 bg-slate-100"></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 2 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>2</div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Truck className="h-6 w-6" /> Shipping Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="rounded-none border-slate-200" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="rounded-none border-slate-200" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required className="rounded-none border-slate-200" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input id="address" required className="rounded-none border-slate-200" placeholder="123 Fashion Ave" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className="rounded-none border-slate-200" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" required className="rounded-none border-slate-200" placeholder="10001" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-none text-base font-semibold mt-4">
                    Continue to Payment
                  </Button>
                </motion.form>
              ) : (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CreditCard className="h-6 w-6" /> Payment Method
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="cardNum">Card Number</Label>
                    <div className="relative">
                      <Input id="cardNum" required className="rounded-none border-slate-200 pl-10" placeholder="0000 0000 0000 0000" />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" required className="rounded-none border-slate-200" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" required className="rounded-none border-slate-200" placeholder="123" />
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-slate-400 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your payment information is encrypted and securely processed. We do not store your credit card details.
                    </p>
                  </div>
                  <Button type="submit" className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-none text-base font-semibold mt-4">
                    Complete Purchase — ${total}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-slate-50 p-8 lg:p-12">
            <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-widest">Order Summary</h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 mb-8">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="h-20 w-16 bg-white border border-slate-100 flex-shrink-0 p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500">Size: {item.selectedSize} · Qty: {item.quantity}</p>
                    <span className="text-sm font-semibold text-slate-900">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-medium">{subtotal > 150 ? "Free" : "$15"}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900 pt-4">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};