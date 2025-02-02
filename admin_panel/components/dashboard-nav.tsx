"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, ShoppingBag, Coffee, ChefHat } from "lucide-react"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    title: "Menu Items",
    href: "/dashboard/menu",
    icon: Coffee,
  },
  {
    title: "Chefs",
    href: "/dashboard/chefs",
    icon: ChefHat,
  },
]

export function DashboardNav({ setOpen }: { setOpen?: (open: boolean) => void }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1 px-2">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen?.(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

