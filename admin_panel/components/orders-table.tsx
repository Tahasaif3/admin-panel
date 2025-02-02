"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Package } from "lucide-react"

type Order = {
  id: string
  customer: string
  items: string[]
  total: number
  status: "received" | "processing" | "delivered"
  date: string
}

const initialOrders: Order[] = [
  {
    id: "ORD001",
    customer: "John Doe",
    items: ["Burger", "Fries", "Coke"],
    total: 25.99,
    status: "received",
    date: "2024-02-01",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    items: ["Pizza", "Wings"],
    total: 35.5,
    status: "processing",
    date: "2024-02-01",
  },
  {
    id: "ORD003",
    customer: "Bob Wilson",
    items: ["Salad", "Sandwich", "Tea"],
    total: 28.75,
    status: "delivered",
    date: "2024-02-01",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    items: ["Pepperoni Pizza", "Garlic Bread", "Ice Cream"],
    total: 42.0,
    status: "received",
    date: "2024-02-02",
  },
  {
    id: "ORD005",
    customer: "Tom Harris",
    items: ["Chicken Parmesan", "Penne Pasta", "Tiramisu"],
    total: 55.25,
    status: "processing",
    date: "2024-02-02",
  },
  {
    id: "ORD006",
    customer: "Sophia Miller",
    items: ["Vegetable Soup", "Grilled Cheese Sandwich", "Brownie"],
    total: 30.0,
    status: "delivered",
    date: "2024-02-02",
  },
  {
    id: "ORD007",
    customer: "David Lee",
    items: ["Beef Burger", "Onion Rings", "Chocolate Milkshake"],
    total: 38.5,
    status: "received",
    date: "2024-02-02",
  },
  {
    id: "ORD008",
    customer: "Rachel Adams",
    items: ["Pizza Margherita", "Caesar Salad", "Tiramisu"],
    total: 48.0,
    status: "processing",
    date: "2024-02-03",
  },
  {
    id: "ORD009",
    customer: "Michael Scott",
    items: ["Spaghetti Carbonara", "Garlic Bread", "Panna Cotta"],
    total: 52.5,
    status: "delivered",
    date: "2024-02-03",
  },
  {
    id: "ORD010",
    customer: "Lisa Green",
    items: ["Chicken Soup", "Steak Fries", "Apple Pie"],
    total: 36.0,
    status: "received",
    date: "2024-02-03",
  },
  {
    id: "ORD011",
    customer: "James White",
    items: ["Cheeseburger", "Fries", "Vanilla Ice Cream"],
    total: 33.0,
    status: "delivered",
    date: "2024-02-04",
  },
  {
    id: "ORD012",
    customer: "Olivia Black",
    items: ["Vegetarian Pizza", "Garlic Bread", "Chocolate Cake"],
    total: 45.0,
    status: "processing",
    date: "2024-02-04",
  },
  {
    id: "ORD013",
    customer: "Daniel Harris",
    items: ["Fish and Chips", "Coleslaw", "Lemonade"],
    total: 40.0,
    status: "received",
    date: "2024-02-05",
  },
];


export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const updateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <span className="line-clamp-1">{order.items.join(", ")}</span>
              </TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "delivered" ? "secondary" : order.status === "processing" ? "destructive" : "default"
                  }
                  className="capitalize"
                >
                  {order.status === "received" && <Package className="mr-1 h-3 w-3" />}
                  {order.status === "processing" && <Clock className="mr-1 h-3 w-3" />}
                  {order.status === "delivered" && <CheckCircle className="mr-1 h-3 w-3" />}
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    variant={order.status === "received" ? "default" : "outline"}
                    onClick={() => updateStatus(order.id, "received")}
                    disabled={order.status === "received"}
                  >
                    Received
                  </Button>
                  <Button
                    size="sm"
                    variant={order.status === "processing" ? "default" : "outline"}
                    onClick={() => updateStatus(order.id, "processing")}
                    disabled={order.status === "processing"}
                  >
                    Processing
                  </Button>
                  <Button
                    size="sm"
                    variant={order.status === "delivered" ? "default" : "outline"}
                    onClick={() => updateStatus(order.id, "delivered")}
                    disabled={order.status === "delivered"}
                  >
                    Delivered
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

