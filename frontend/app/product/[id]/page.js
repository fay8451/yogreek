"use client"
// อันนี้หน้ารายละเอียด product
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { useRouter } from "next/navigation"
import { ShoppingCart, Search, Check, Minus, Plus, ShoppingBag } from 'lucide-react'

// ✅ Sample product list
const products = [
    {
      id: "1",
      name: "Plain Greek yogurt",
      description: "กรีกโยเกิร์ตรสดั้งเดิม ไม่มีน้ำตาล โปรตีนสูง",
      weight: "80 g",
      price: "100.00",
      image: "https://www.daisybeet.com/wp-content/uploads/2024/01/Homemade-Greek-Yogurt-13.jpg",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "plain"
    },
    {
      id: "2",
      name: "Peanut butter Greek yogurt",
      description: "โยเกิร์ตรสเนยถั่ว หอมมัน อร่อยลงตัว",
      weight: "120 g",
      price: "120.00",
      image: "https://www.walderwellness.com/wp-content/uploads/2022/02/Peanut-Butter-Greek-Yogurt-Walder-Wellness-2.jpg",
      features: ["Nutty taste", "Energy booster", "Protein packed"],
      category: "sweet"
    },
    {
      id: "3",
      name: "Banana Greek yogurt",
      description: "โยเกิร์ตกล้วยหอม กลิ่นหอมหวานตามธรรมชาติ",
      weight: "160 g",
      price: "120.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8qQ5nykmhb0UVn23P7ScZUT_5Vm3mDxpm1Q&s",
      features: ["With real banana", "Low fat", "No additives"],
      category: "fruit"
    },
    {
      id: "4",
      name: "Matcha Blueberry Greek yogurt",
      description:
        "กรีกโยเกิร์ตรสมัทฉะ + บลูเบอร์รี่ สีเขียวสดจากมัทฉะแท้ผสานความหอมหวานของบลูเบอร์รี่",
      weight: "150 g",
      price: "180.00",
      image:
        "https://ceremonymatcha.com/cdn/shop/articles/Bildschirmfoto_2022-05-18_um_15.05.06.jpg?crop=center&height=600&v=1652879988&width=600",
      features: ["High protein", "Matcha & blueberry", "Fresh delivery"],
      category: "fruit"
    },
    {
      id: "5",
      name: "Chocolate Greek yogurt",
      description: "กรีกโยเกิร์ตรสช็อคโกแลต รสชาติเข้มข้นของช็อคโกแลต โปรตีนสูง",
      weight: "130 g",
      price: "130.00",
      image: "https://thefoodiediaries.co/wp-content/uploads/2023/04/img_7612-e1680534690722.jpg",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "sweet"
    },
    {
      id: "6",
      name: "Blueberry Greek yogurt",
      description: "กรีกโยเกิร์ตรสบลูเบอร์รี่  โปรตีนสูง",
      weight: "120 g",
      price: "150.00",
      image: "https://www.mjandhungryman.com/wp-content/uploads/2023/04/Blueberry-yogurt.jpg",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "fruit"
    },
    {
      id: "7",
      name: "Apple Cinnamon Greek yogurt",
      description: "กรีกโยเกิร์ตรสแอปเปิ้ลซินนามอน  โปรตีนสูง",
      weight: "150 g",
      price: "140.00",
      image: "https://www.sugarsalted.com/wp-content/uploads/2023/10/caramelized-apple-yogurt-parfaits-dessert-jars-25feat.jpg",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "fruit"
    },
    {
      id: "8",
      name: "Biscoff Greek yogurt",
      description: "กรีกโยเกิร์ตรสบิสคอฟ  โปรตีนสูง",
      weight: "130 g",
      price: "130.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Kq4AsXIJ1J1_f3ozJpvqxS9T2HJyiFrqvQ&s",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "sweet"
    },
    {
      id: "9",
      name: "Honey Greek yogurt",
      weight: "120 g",
      price: "140.00",
      image: "https://paleoglutenfree.com/wp-content/uploads/2017/03/granola-parfait-14-678x1024.jpg",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "sweet"
    },
    {
      id: "10",
      name: "Caramel Greek yogurt",
      weight: "140 g",
      price: "150.00",
      image: "https://au.easiyo.com/cdn/shop/products/GS.SaltedCaramel_2048x.jpg?v=1625018779",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "sweet"
    },
    {
      id: "11",
      name: "Strawberry Greek yogurt",
      weight: "130 g",
      price: "150.00",
      image: "https://www.savoryonline.com/app/uploads/recipes/232671/whipped-yogurt-with-roasted-strawberries-scaled-640x640-c-center.jpg",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "fruit"
    },
    {
      id: "12",
      name: "Mixed Berry Greek yogurt",
      weight: "140 g",
      price: "160.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6d114qumGIED84ji88YSGIFL-Wbq54P-HmQ&s",
      features: ["High protein", "No sugar", "Fresh daily"],
      category: "fruit"
    }
    
]
  
export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params?.id?.toString()
  const product = products.find((p) => p.id === params.id)
  const [quantity, setQuantity] = useState(1)
  const [cartCount, setCartCount] = useState(0)
  const [showCartNotification, setShowCartNotification] = useState(false)
  
  // Get related products (same category or random if no category match)
  const relatedProducts = product 
    ? products
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 3) || products.filter(p => p.id !== product.id).slice(0, 3)
    : []
  
  // Load cart count on component mount
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const count = cart.reduce((total, item) => total + item.quantity, 0)
      setCartCount(count)
    } catch (error) {
      console.error("Failed to load cart:", error)
    }
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/all" 
          className="bg-[#A0C0FF] hover:bg-[#80A0FF] text-white py-2 px-6 rounded-full"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      weight: product.weight,
    }

    try {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
      const existingItemIndex = existingCart.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity
      } else {
        existingCart.push(cartItem)
      }

      localStorage.setItem("cart", JSON.stringify(existingCart))
      
      // Update cart count
      const newCount = existingCart.reduce((total, item) => total + item.quantity, 0)
      setCartCount(newCount)
      
      // Show notification
      setShowCartNotification(true)
      setTimeout(() => setShowCartNotification(false), 3000)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      alert("There was an error adding to cart. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0]">
      {/* Cart notification */}
      {showCartNotification && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="w-5 h-5 mr-2" />
          Product added to cart!
        </div>
      )}
      
      {/* Header */}
      <header className="container mx-auto p-4 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
         <Link
            href="/"
            className="text-[#7B3FE4] hover:underline flex items-center"
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
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Product Detail */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="border-4 border-[#E8D0FF] rounded-3xl p-4 bg-white">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-auto rounded-xl" />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-[#4A3728] mb-4">{product.name}</h1>

            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="mb-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center mb-1">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-2 text-gray-600">{product.weight}</div>

            <div className="text-xl font-bold mb-6">{product.price} THB</div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={addToCart}
                className="px-6 py-2 bg-[#A0C0FF] hover:bg-[#80A0FF] text-white rounded-full transition-colors flex items-center"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to cart
              </button>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/cart" 
                className="text-[#7B3FE4] hover:underline flex items-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View cart
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="border-2 border-[#E8E0FF] rounded-lg p-4 bg-white">
                  <Link href={`/product/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                    />
                  </Link>
                  <h3 className="font-medium text-lg mt-2">{relatedProduct.name}</h3>
                  <div className="text-sm text-gray-600 mb-1">{relatedProduct.weight}</div>
                  <div className="font-bold mb-3">{relatedProduct.price} THB</div>
                  <Link 
                    href={`/product/${relatedProduct.id}`}
                    className="block w-full text-center bg-[#A0C0FF] hover:bg-[#80A0FF] text-white py-2 px-4 rounded-full transition-colors"
                  >
                    View product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}