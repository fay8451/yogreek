"use client"
// อันนี้คือหน้าตะกร้าสินค้า
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Search } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // โหลดข้อมูลตะกร้าจาก localStorage เมื่อหน้าถูกโหลด
  useEffect(() => {
    // ใช้ setTimeout เพื่อหลีกเลี่ยงปัญหา hydration error
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

  // อัปเดตจำนวนสินค้า
  const updateQuantity = (id, change) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })

    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  // คำนวณราคารวมของสินค้าแต่ละชิ้น
  const calculateSubtotal = (price, quantity) => {
    return (Number.parseFloat(price) * quantity).toFixed(2)
  }

  // คำนวณราคารวมทั้งหมด
  const totalPrice = cartItems.reduce((sum, item) => sum + Number.parseFloat(item.price) * item.quantity, 0).toFixed(2)

  // ไปยังหน้า checkout
  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0]">
      {/* Header */}
      <header className="container mx-auto p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/" className="h-12 mr-4">
            <img
              src="/logo.png"
              alt="YO! GREEK Logo"
              className="h-full object-contain"
            />
          </Link>
        </div>

        <div className="relative flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products ..."
              className="w-full py-2 pl-10 pr-4 bg-[#FFFDE0] rounded-full border border-[#FFECB3] focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[#7B3FE4] font-medium underline">
            Login
          </Link>
          <Link href="/cart" className="text-[#D8B0FF]">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#D8D0F0]">
        <div className="container mx-auto flex">
          <Link href="/" className="py-3 px-6 font-medium text-center flex-1">
            Home
          </Link>
          <Link href="/all" className="py-3 px-6 font-medium text-center flex-1">
            All product
          </Link>
          <Link href="/fruits" className="py-3 px-6 font-medium text-center flex-1">
            With fruits
          </Link>
          <Link href="/sweets" className="py-3 px-6 font-medium text-center flex-1">
            Sweets
          </Link>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-black text-center mb-8">SHOPPING CART</h1>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7B3FE4]"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl mb-4">ตะกร้าสินค้าของคุณว่างเปล่า</p>
            <Link href="/all" className="bg-[#A0C0FF] hover:bg-[#80A0FF] text-white py-2 px-6 rounded-full">
              เลือกซื้อสินค้า
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 font-medium text-lg">Product</th>
                    <th className="text-right py-4 px-2 font-medium text-lg">Price</th>
                    <th className="text-center py-4 px-2 font-medium text-lg">Quantity</th>
                    <th className="text-right py-4 px-2 font-medium text-lg">Subtotal</th>
                    <th className="py-4 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-6 px-2">
                        <div className="flex items-center">
                          <div className="w-24 h-24 mr-4 overflow-hidden rounded-lg">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.weight}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-2 text-right">฿ {item.price}</td>
                      <td className="py-6 px-2">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-l-md"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center bg-yellow-100">{item.quantity}</div>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-r-md"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-6 px-2 text-right font-medium">
                        ฿ {calculateSubtotal(item.price, item.quantity)}
                      </td>
                      <td className="py-6 px-2 text-center">
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-8">
              <div className="w-full max-w-md">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Total</span>
                  <span className="font-medium">฿ {totalPrice}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Shipping</span>
                  <span className="font-medium">฿ 80.00</span>
                </div>
                <div className="flex justify-between py-4 font-bold text-lg">
                  <span>Overall</span>
                  <span>฿ {(Number.parseFloat(totalPrice) + 80).toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#C3D4ED] border-2 border-[#FFF2BE] px-8 py-3 font-bold text-lg hover:bg-yellow-200 transition-colors mt-4"
                >
                  READY TO CHECKOUT
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}