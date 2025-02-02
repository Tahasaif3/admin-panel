"use client"

import { useState } from "react"
import { Pencil, Plus, Trash } from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type MenuItem = {
  name: string
  slug: {
    current: string
  }
  category: string
  price: number
  originalPrice: number
  tags: string[]
  image: string
  description: string
  available: boolean
}

const menuItems: MenuItem[] = [
  {
    name: "Fresh Lime",
    slug: {
      current: "fresh-lime",
    },
    category: "Drink",
    price: 38.0,
    originalPrice: 45.0,
    tags: ["Healthy", "Popular"],
    image: "/food/food-1.png",
    description: "Refre-shing fresh lime drink made with natural ingredients.",
    available: true,
  },
  {
    name: "Chocolate Muffin",
    slug: {
      current: "chocolate-muffin",
    },
    category: "Dessert",
    price: 28.0,
    originalPrice: 30.0,
    tags: ["Sell", "Sweet"],
    image: "/food/food-2.png",
    description: "Soft and rich chocolate muffin topped with chocolate chips.",
    available: true,
  },
  {
    name: "Burger",
    slug: {
      current: "burger"
    },
    category: "Sandwich",
    price: 21,
    originalPrice: 45,
    tags: [
      "Popular"
    ],
    image: "/food/food-3.png",
    description: "Juicy beef burger with fresh lettuce, tomatoes, and cheese.",
    available: true
  },
  {
    name: "Country Burger",
    slug: {
      current: "country-burger"
    },
    category: "Sandwich",
    price: 45,
    originalPrice: 50,
    tags: [
      "Recommended"
    ],
    image: "/food/food-4.png",
    description: "Classic country-style burger served with fries.",
    available: true
  },
  {
    name: "Pizza",
    slug: {
      current: "pizza"
    },
    category: "Main Course",
    price: 43,
    originalPrice: 50,
    tags: [
      "Cheesy",
      "Vegetarian"
    ],
    image: "/food/food-5.png",
    description: "Delicious vegetarian pizza topped with fresh vegetables and cheese.",
    available: true
  },
  {
    name: "Chicken Chup",
    slug: {
      current: "chicken-chup"
    },
    category: "Appetizer",
    price: 12,
    originalPrice: 15,
    tags: [
      "Sell",
      "Crispy"
    ],
    image: "/food/food-6.png",
    description: "Crispy fried chicken bites served with dipping sauce.",
    available: true
  },
  {
    name: "Caesar Salad",
    slug: {
      current: "caesar-salad"
    },
    category: "Salad",
    price: 32,
    originalPrice: 35,
    tags: [
      "Healthy",
      "Fresh"
    ],
    image: "/food/food-7.jpg",
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
    available: true
  },
  {
    name: "Spaghetti Carbonara",
    slug: {
      current: "spaghetti-carbonara"
    },
    category: "Main Course",
    price: 48,
    originalPrice: 55,
    tags: [
      "Italian",
      "Creamy"
    ],
    image: "/food/food-8.jpg",
    description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    available: true
  },
  {
    name: "Iced Coffee",
    slug: {
      current: "iced-coffee"
    },
    category: "Drink",
    price: 25,
    originalPrice: 30,
    tags: [
      "Refreshing",
      "Caffeinated"
    ],
    image: "/food/food-9.webp",
    description: "Chilled coffee served over ice, perfect for a hot day.",
    available: true
  },
  {
    name: "Fruit Tart",
    slug: {
      current: "fruit-tart"
    },
    category: "Dessert",
    price: 36,
    originalPrice: 40,
    tags: [
      "Sweet",
      "Fruity"
    ],
    image: "/food/food-10.jpg",
    description: "Buttery pastry crust filled with custard and topped with fresh seasonal fruits.",
    available: true
  },
  {
    name: "Grilled Salmon",
    slug: {
      current: "grilled-salmon"
    },
    category: "Main Course",
    price: 58,
    originalPrice: 65,
    tags: [
      "Healthy",
      "Seafood"
    ],
    image: "/food/food-11.jpg",
    description: "Perfectly grilled salmon fillet served with steamed vegetables and lemon butter sauce.",
    available: true
  },
  {
    name: "Mushroom Risotto",
    slug: {
      current: "mushroom-risotto"
    },
    category: "Main Course",
    price: 46,
    originalPrice: 50,
    tags: [
      "Vegetarian",
      "Creamy"
    ],
    image: "/food/food-12.jpg",
    description: "Creamy Italian rice dish cooked with a variety of mushrooms and parmesan cheese.",
    available: true
  },
  {
    name: "Avocado Toast",
    slug: {
      current: "avocado-toast"
    },
    category: "Breakfast",
    price: 22,
    originalPrice: 25,
    tags: [
      "Healthy",
      "Trendy"
    ],
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Toasted artisan bread topped with mashed avocado, cherry tomatoes, and a poached egg.",
    available: true
  },
  {
    name: "Beef Tacos",
    slug: {
      current: "beef-tacos"
    },
    category: "Main Course",
    price: 35,
    originalPrice: 40,
    tags: [
      "Mexican",
      "Spicy"
    ],
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Three soft corn tortillas filled with seasoned ground beef, lettuce, cheese, and pico de gallo.",
    available: true
  },
  {
    name: "Matcha Latte",
    slug: {
      current: "matcha-latte"
    },
    category: "Drink",
    price: 30,
    originalPrice: 35,
    tags: [
      "Japanese",
      "Antioxidant"
    ],
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Smooth and creamy latte made with high-grade matcha green tea powder and steamed milk.",
    available: true
  },
  {
    name: "Chicken Tikka Masala",
    slug: {
      current: "chicken-tikka-masala"
    },
    category: "Main Course",
    price: 52,
    originalPrice: 60,
    tags: [
      "Indian",
      "Spicy"
    ],
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Tender chicken pieces in a rich and creamy tomato-based sauce, served with basmati rice.",
    available: true
  },
  {
    name: "Greek Salad",
    slug: {
      current: "greek-salad"
    },
    category: "Salad",
    price: 38,
    originalPrice: 45,
    tags: [
      "Mediterranean",
      "Healthy"
    ],
    image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Fresh salad with cucumbers, tomatoes, olives, feta cheese, and red onions, dressed with olive oil.",
    available: true
  },
  {
    name: "Chocolate Lava Cake",
    slug: {
      current: "chocolate-lava-cake"
    },
    category: "Dessert",
    price: 32,
    originalPrice: 35,
    tags: [
      "Decadent",
      "Sweet"
    ],
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Warm chocolate cake with a gooey molten chocolate center, served with vanilla ice cream.",
    available: true
  },
  {
    name: "Vegetable Stir Fry",
    slug: {
      current: "vegetable-stir-fry"
    },
    category: "Main Course",
    price: 40,
    originalPrice: 45,
    tags: [
      "Vegetarian",
      "Asian"
    ],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Colorful mix of fresh vegetables stir-fried in a savory sauce, served over steamed rice.",
    available: true
  },
  {
    name: "Mango Smoothie",
    slug: {
      current: "mango-smoothie"
    },
    category: "Drink",
    price: 28,
    originalPrice: 32,
    tags: [
      "Fruity",
      "Refreshing"
    ],
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Creamy smoothie made with ripe mangoes, yogurt, and a hint of honey.",
    available: true
  },
  {
    name: "Eggs Benedict",
    slug: {
      current: "eggs-benedict"
    },
    category: "Breakfast",
    price: 42,
    originalPrice: 48,
    tags: [
      "Classic",
      "Brunch"
    ],
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Poached eggs and Canadian bacon on English muffins, topped with hollandaise sauce.",
    available: true
  },
  {
    name: "Caprese Sandwich",
    slug: {
      current: "caprese-sandwich"
    },
    category: "Sandwich",
    price: 34,
    originalPrice: 38,
    tags: [
      "Italian",
      "Vegetarian"
    ],
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Fresh mozzarella, tomatoes, and basil leaves on ciabatta bread, drizzled with balsamic glaze.",
    available: true
  },
  {
    name: "Shrimp Scampi",
    slug: {
      current: "shrimp-scampi"
    },
    category: "Main Course",
    price: 56,
    originalPrice: 65,
    tags: [
      "Seafood",
      "Garlic"
    ],
    image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Succulent shrimp sautéed in a garlic butter sauce, served over a bed of linguine pasta.",
    available: true
  },
  {
    name: "Sushi Roll Platter",
    slug: {
      current: "sushi-roll-platter"
    },
    category: "Main Course",
    price: 65,
    originalPrice: 75,
    tags: [
      "Japanese",
      "Seafood"
    ],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Assorted sushi rolls including California, spicy tuna, and vegetable rolls.",
    available: true
  },
  {
    name: "Beef Pho",
    slug: {
      current: "beef-pho"
    },
    category: "Soup",
    price: 42,
    originalPrice: 48,
    tags: [
      "Vietnamese",
      "Comfort Food"
    ],
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Traditional Vietnamese noodle soup with tender beef slices and aromatic herbs.",
    available: true
  },
  {
    name: "Margherita Pizza",
    slug: {
      current: "margherita-pizza"
    },
    category: "Main Course",
    price: 39,
    originalPrice: 45,
    tags: [
      "Italian",
      "Vegetarian"
    ],
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Classic pizza with tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.",
    available: true
  },
  {
    name: "Acai Bowl",
    slug: {
      current: "acai-bowl"
    },
    category: "Breakfast",
    price: 32,
    originalPrice: 36,
    tags: [
      "Healthy",
      "Superfood"
    ],
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Blended acai berries topped with granola, fresh fruits, and a drizzle of honey.",
    available: true
  },
  {
    name: "Beef Lasagna",
    slug: {
      current: "beef-lasagna"
    },
    category: "Main Course",
    price: 48,
    originalPrice: 55,
    tags: [
      "Italian",
      "Comfort Food"
    ],
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Layers of pasta, seasoned ground beef, ricotta, and mozzarella cheese in tomato sauce.",
    available: true
  },
  {
    name: "Pad Thai",
    slug: {
      current: "pad-thai"
    },
    category: "Main Course",
    price: 38,
    originalPrice: 42,
    tags: [
      "Thai",
      "Stir-Fry"
    ],
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Stir-fried rice noodles with shrimp, tofu, peanuts, bean sprouts, and tamarind sauce.",
    available: true
  },
  {
    name: "Tiramisu",
    slug: {
      current: "tiramisu"
    },
    category: "Dessert",
    price: 28,
    originalPrice: 32,
    tags: [
      "Italian",
      "Coffee"
    ],
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    available: true
  },
  {
    name: "Chicken Shawarma",
    slug: {
      current: "chicken-shawarma"
    },
    category: "Sandwich",
    price: 36,
    originalPrice: 40,
    tags: [
      "Middle Eastern",
      "Spicy"
    ],
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Marinated chicken wrapped in pita bread with vegetables and garlic sauce.",
    available: true
  },
  {
    name: "Lobster Bisque",
    slug: {
      current: "lobster-bisque"
    },
    category: "Soup",
    price: 52,
    originalPrice: 60,
    tags: [
      "Seafood",
      "Creamy"
    ],
    image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Rich and creamy soup made with lobster stock, cream, and chunks of tender lobster meat.",
    available: true
  },
  {
    name: "Falafel Plate",
    slug: {
      current: "falafel-plate"
    },
    category: "Main Course",
    price: 34,
    originalPrice: 38,
    tags: [
      "Middle Eastern",
      "Vegetarian"
    ],
    image: "/food/falafel.jpg",
    description: "Crispy chickpea fritters served with hummus, tahini sauce, and a fresh Mediterranean salad.",
    available: true
  },
  {
    name: "Beef Wellington",
    slug: {
      current: "beef-wellington"
    },
    category: "Main Course",
    price: 75,
    originalPrice: 85,
    tags: [
      "British",
      "Gourmet"
    ],
    image: "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Tender beef fillet wrapped in puff pastry with mushroom duxelles and prosciutto.",
    available: true
  },
  {
    name: "Miso Ramen",
    slug: {
      current: "miso-ramen"
    },
    category: "Soup",
    price: 44,
    originalPrice: 50,
    tags: [
      "Japanese",
      "Comfort Food"
    ],
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Hearty soup with miso-based broth, ramen noodles, soft-boiled egg, and chashu pork.",
    available: true
  },
  {
    name: "Lemon Cheesecake",
    slug: {
      current: "lemon-cheesecake"
    },
    category: "Dessert",
    price: 30,
    originalPrice: 35,
    tags: [
      "Tangy",
      "Sweet"
    ],
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Creamy cheesecake with a tangy lemon flavor, served on a graham cracker crust.",
    available: true
  }
]

const categories = Array.from(new Set(menuItems.map((item) => item.category)))

export function MenuItemsTable() {
  const [items, setItems] = useState<MenuItem[]>(menuItems)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null)
  const [newItem, setNewItem] = useState<MenuItem>({
    name: "",
    slug: { current: "" },
    category: "",
    price: 0,
    originalPrice: 0,
    tags: [],
    image: "/placeholder.svg",
    description: "",
    available: true,
  })

  const toggleAvailability = (slug: string) => {
    setItems(items.map((item) => (item.slug.current === slug ? { ...item, available: !item.available } : item)))
  }

  const deleteItem = (item: MenuItem) => {
    setItemToDelete(item)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setItems(items.filter((item) => item.slug.current !== itemToDelete.slug.current))
      setItemToDelete(null)
    }
  }

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setNewItem((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleNewItemAvailability = (checked: boolean) => {
    setNewItem((prev) => ({ ...prev, available: checked }))
  }

  const handleNewItemCategory = (value: string) => {
    setNewItem((prev) => ({ ...prev, category: value }))
  }

  const handleNewItemTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim())
    setNewItem((prev) => ({ ...prev, tags }))
  }

  const addNewItem = () => {
    const slug = { current: newItem.name.toLowerCase().replace(/ /g, "-") }
    setItems((prev) => [...prev, { ...newItem, slug }])
    setNewItem({
      name: "",
      slug: { current: "" },
      category: "",
      price: 0,
      originalPrice: 0,
      tags: [],
      image: "/placeholder.svg",
      description: "",
      available: true,
    })
  }


  const filteredItems = categoryFilter === "all" ? items : items.filter((item) => item.category === categoryFilter)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
      <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Enter the details of the new menu item here. Click save when you`re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleNewItemChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select onValueChange={handleNewItemCategory}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newItem.price}
                  onChange={handleNewItemChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="originalPrice" className="text-right">
                  Original Price
                </Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  value={newItem.originalPrice}
                  onChange={handleNewItemChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  value={newItem.tags.join(", ")}
                  onChange={handleNewItemTags}
                  placeholder="Enter tags separated by commas"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={newItem.image}
                  onChange={handleNewItemChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleNewItemChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="available" className="text-right">
                  Available
                </Label>
                <Switch id="available" checked={newItem.available} onCheckedChange={handleNewItemAvailability} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addNewItem}>
                Save item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.slug.current}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 relative rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                    {item.price !== item.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={item.available ? "default" : "destructive"}>
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost"
                   onClick={() => deleteItem(item)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleAvailability(item.slug.current)}>
                      {item.available ? "Mark Unavailable" : "Mark Available"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this menu item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the menu item from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

