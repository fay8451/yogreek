"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ShoppingCart, Search } from "lucide-react"

export default function Home() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    // Load cart from localStorage when component mounts
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load cart:", error)
    }
  }, [])

  // Product data
  const products = [
    {
      id: "1",
      name: "Plain Greek yogurt",
      weight: "80 g",
      price: "100.00",
      image: "https://www.daisybeet.com/wp-content/uploads/2024/01/Homemade-Greek-Yogurt-13.jpg",
    },
    {
      id: "2",
      name: "Peanut butter Greek yogurt",
      weight: "120 g",
      price: "120.00",
      image:
        "https://www.walderwellness.com/wp-content/uploads/2022/02/Peanut-Butter-Greek-Yogurt-Walder-Wellness-2.jpg",
    },
    {
      id: "3",
      name: "Banana Greek yogurt",
      weight: "160 g",
      price: "120.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8qQ5nykmhb0UVn23P7ScZUT_5Vm3mDxpm1Q&s",
    },
    {
      id: "4",
      name: "Matcha Blueberry Greek yogurt",
      weight: "150 g",
      price: "180.00",
      image:
        "https://ceremonymatcha.com/cdn/shop/articles/Bildschirmfoto_2022-05-18_um_15.05.06.jpg?crop=center&height=600&v=1652879988&width=600",
    },
  ]

  // Add product to cart
  const addToCart = (product) => {
    const updatedCart = [...cart]
    const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id)

    if (existingItemIndex >= 0) {
      // Product already in cart, increase quantity
      updatedCart[existingItemIndex].quantity += 1
    } else {
      // Add new product to cart
      updatedCart.push({
        ...product,
        quantity: 1,
      })
    }

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Show feedback to user
    alert(`${product.name} added to cart!`)
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0]">
      {/* Header */}
      <header className="container mx-auto p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-12 mr-4">
            <img src="/logo.png" alt="YO! GREEK Logo" className="h-full object-contain" />
          </div>
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
          <Link href="/cart" className="text-[#D8B0FF] relative">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#D8D0F0]">
        <div className="container mx-auto flex">
          <Link href="/" className="py-3 px-6 font-medium text-center flex-1 border-b-2 border-black">
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

      {/* Hero Image */}
      <div className="w-full">
        <img
          src="https://backend.paleorobbie.com/static/db/plr/files/grass%20fed%20Greek%20yogurt%20Thailand,egE6z7lA6XA=.jpg"
          alt="Yogurt with berries"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Best Selling Section */}
      <section className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-[#E8E0FF] px-6 py-2 rounded-full">
            <h2 className="text-xl font-bold">Best Selling</h2>
          </div>
          <Link href="/all" className="text-[#9370DB] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border-2 border-[#E8E0FF] rounded-lg p-2">
              <div className="mb-2">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                  />
                </Link>
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <div className="text-sm text-gray-600">{product.weight}</div>
              <div className="font-bold">{product.price} THB</div>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-[#A0C0FF] hover:bg-[#80A0FF] text-white py-1 px-4 rounded-full"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
