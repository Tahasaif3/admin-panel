"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

type Order = {
  id: string
  customer: string
  items: MenuItem[]
  total: number
  status: "received" | "processing" | "delivered"
  date: string
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
    image: "http://localhost:3000/food/food-1.png",
    description: "Refreshing fresh lime drink made with natural ingredients.",
    available: true,
  },
  // ... add more menu items here
]

const generateRandomOrders = (count: number): Order[] => {
  const orders: Order[] = []
  const statuses: ("received" | "processing" | "delivered")[] = ["received", "processing", "delivered"]

  for (let i = 0; i < count; i++) {
    const numItems = Math.floor(Math.random() * 3) + 1
    const orderItems = Array(numItems)
      .fill(null)
      .map(() => menuItems[Math.floor(Math.random() * menuItems.length)])
      .filter((item): item is MenuItem => item !== undefined) // This line ensures we only keep defined items
    const total = orderItems.reduce((sum, item) => sum + item.price, 0)

    orders.push({
      id: `ORD${(i + 1).toString().padStart(3, "0")}`,
      customer: `Customer ${i + 1}`,
      items: orderItems,
      total: Number.parseFloat(total.toFixed(2)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date().toISOString().split("T")[0],
    })
  }

  return orders
}

export function RandomOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(generateRandomOrders(10))
  }, [])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "delivered" ? "secondary" : order.status === "processing" ? "destructive" : "default"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

