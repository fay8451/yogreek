"use client"
import Link from 'next/link'
// อันนี้คือหน้าcheck out

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronDown } from 'lucide-react'

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState("delivery")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Load cart items from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleShippingChange = (method) => {
    setShippingMethod(method)
  }

  const handlePaymentChange = (method) => {
    setPaymentMethod(method)
  }
  
  const router = useRouter()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // In a real application, you would send the order to your backend
    // For now, we'll just clear the cart and redirect
    localStorage.removeItem("cart")
    
    router.push("/order-status")
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number.parseFloat(item.price) * item.quantity, 
    0
  ).toFixed(2)
  
  // Calculate total based on shipping method
  const shippingCost = shippingMethod === "delivery" ? 80 : 0
  const total = (Number.parseFloat(subtotal) + shippingCost).toFixed(2)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FFFBF0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7B3FE4]"></div>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some products to your cart before checking out.</p>
        <Link 
          href="/all" 
          className="bg-[#A0C0FF] hover:bg-[#80A0FF] text-white py-2 px-6 rounded-full"
        >
          Browse Products
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] py-12 px-4">
      <div className="max-w-6xl mx-auto">
      <Link
          href="/"
          className="absolute top-6 left-6 text-[#7B3FE4] hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to home
        </Link>

        <h1 className="text-4xl font-black text-center mb-10">CHECKOUT</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Details Section */}
          <div className="bg-[#C9D6F0] p-6 rounded-3xl border-4 border-[#FFECB3]">
            <h2 className="text-xl font-bold mb-4">Details</h2>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 rounded-full bg-[#FFFDE0] border border-[#FFECB3]"
                  />
                </div>
               
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 rounded-full bg-[#FFFDE0] border border-[#FFECB3]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-full bg-[#FFFDE0] border border-[#FFECB3]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  required={shippingMethod === "delivery"}
                  disabled={shippingMethod === "pickup"}
                  className="w-full px-4 py-3 rounded-full bg-[#FFFDE0] border border-[#FFECB3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="city" className="block mb-1">
                    City
                  </label>
                  <div className="relative">
                    <select
                      id="city"
                      required={shippingMethod === "delivery"}
                      disabled={shippingMethod === "pickup"}
                      className="w-full px-4 py-3 rounded-full bg-[#FFFDE0] border border-[#FFECB3] appearance-none"
                    >
                      <option value="bangkok">Bangkok</option>
                      <option value="chiangmai">Chiang Mai</option>
                      <option value="phuket">Phuket</option>
                      <option value="pattaya">Pattaya</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="postcode" className="block mb-1">
                    Post Code
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    required={shippingMethod === "delivery"}
                    disabled={shippingMethod === "pickup"}
                    className="w-full px-4 py-3 rounded-full bg-[#FFFDE0] border border-[#FFECB3]"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="bg-[#E8D0FF] p-6 rounded-3xl border-4 border-[#FFECB3]">
            <h2 className="text-xl font-bold mb-4">Your order</h2>

            <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
              <div className="font-medium">PRODUCT</div>
              <div className="font-medium">SUBTOTAL</div>
            </div>

            <div className="max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div>{item.price} × {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-medium">฿ {(Number.parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
              <div className="font-medium">SUBTOTAL</div>
              <div className="font-medium">฿ {subtotal}</div>
            </div>

            <div className="mb-6">
              <div className="font-medium mb-2">Shipping</div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="delivery"
                  name="shipping"
                  checked={shippingMethod === "delivery"}
                  onChange={() => handleShippingChange("delivery")}
                  className="mr-2"
                />
                <label htmlFor="delivery" className="flex justify-between w-full">
                  <span>Delivery</span>
                  <span>฿ 80.00</span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="pickup"
                  name="shipping"
                  checked={shippingMethod === "pickup"}
                  onChange={() => handleShippingChange("pickup")}
                  className="mr-2"
                />
                <label htmlFor="pickup">Pick up at the store</label>
              </div>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-2 mb-6">
              <div className="font-bold">Total</div>
              <div className="font-bold">฿ {total}</div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => handlePaymentChange("card")}
                  className="mr-2"
                />
                <label htmlFor="card">Credit/Debit card</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="banking"
                  name="payment"
                  checked={paymentMethod === "banking"}
                  onChange={() => handlePaymentChange("banking")}
                  className="mr-2"
                />
                <label htmlFor="banking">Mobile Banking</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="promptpay"
                  name="payment"
                  checked={paymentMethod === "promptpay"}
                  onChange={() => handlePaymentChange("promptpay")}
                  className="mr-2"
                />
                <label htmlFor="promptpay">Promptpay</label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#333333] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors">
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}