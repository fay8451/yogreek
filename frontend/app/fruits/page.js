"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Search } from "lucide-react"

export default function FruitsPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load cart:", error)
    }
  }, [])

  const addToCart = (product) => {
    const updatedCart = [...cart]
    const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id)

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity += 1
    } else {
      updatedCart.push({
        ...product,
        quantity: 1,
      })
    }

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    alert(`${product.name} added to cart!`)
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0]">
      <header className="container mx-auto p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <Link href="/" className="h-12 mr-4">
            <img src="/logo.png" alt="YO! GREEK Logo" className="h-full object-contain" />
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

      <nav className="bg-[#D8D0F0]">
        <div className="container mx-auto flex">
          <Link href="/" className="py-3 px-6 font-medium text-center flex-1">
            Home
          </Link>
          <Link href="/all" className="py-3 px-6 font-medium text-center flex-1">
            All product
          </Link>
          <Link href="/fruits" className="py-3 px-6 font-medium text-center flex-1 border-b-2 border-black">
            With fruits
          </Link>
          <Link href="/sweets" className="py-3 px-6 font-medium text-center flex-1">
            Sweets
          </Link>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Fruit Yogurts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fruitProducts.map((product) => (
            <div key={product.id} className="border-2 border-[#E8E0FF] rounded-lg p-4 bg-white">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                />
              </Link>

              <h3 className="font-medium text-lg">{product.name}</h3>
              <div className="text-sm text-gray-600 mb-1">{product.weight}</div>
              <div className="font-bold mb-3">{product.price} THB</div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#A0C0FF] hover:bg-[#80A0FF] text-white py-2 px-4 rounded-full transition-colors"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

const fruitProducts = [
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
    image: "https://ceremonymatcha.com/cdn/shop/articles/Bildschirmfoto_2022-05-18_um_15.05.06.jpg?crop=center&height=600&v=1652879988&width=600",
  },
  {
    id: "6",
    name: "Blueberry Greek yogurt",
    weight: "120 g",
    price: "150.00",
    image: "https://www.mjandhungryman.com/wp-content/uploads/2023/04/Blueberry-yogurt.jpg",
  },
  {
    id: "7",
    name: "Apple Cinnamon Greek yogurt",
    weight: "150 g",
    price: "140.00",
    image: "https://www.sugarsalted.com/wp-content/uploads/2023/10/caramelized-apple-yogurt-parfaits-dessert-jars-25feat.jpg",
  },
  {
    id: "11",
    name: "Strawberry Greek yogurt",
    weight: "130 g",
    price: "150.00",
    image: "https://www.savoryonline.com/app/uploads/recipes/232671/whipped-yogurt-with-roasted-strawberries-scaled-640x640-c-center.jpg",
  },
  {
    id: "12",
    name: "Mixed Berry Greek yogurt",
    weight: "140 g",
    price: "160.00",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6d114qumGIED84ji88YSGIFL-Wbq54P-HmQ&s",
  },
]

