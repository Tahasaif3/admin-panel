import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "RD001",
    customer: "Customer 1",
    items: ["Fresh Lime"],
    total: 38.0,
    status: "delivered",
  },
  {
    id: "RD002",
    customer: "Customer 2",
    items: ["Fresh Lime", "Fresh Lime"],
    total: 114.0,
    status: "processing",
  },
  {
    id: "RD003",
    customer: "Customer 3",
    items: ["Fresh Lime", "Fresh Lime", "Fresh Lime"],
    total: 152.0,
    status: "pending",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-1">
      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr] gap-4 items-center px-6 py-3 hover:bg-gray-50"
        >
          <div className="text-sm font-medium">{order.id}</div>
          <div className="text-sm">{order.customer}</div>
          <div className="text-sm text-gray-500">{order.items.join(", ")}</div>
          <div className="text-sm font-medium">${order.total.toFixed(2)}</div>
          <div>
            <Badge
              variant={
                order.status === "delivered" ? "default" : order.status === "processing" ? "secondary" : "destructive"
              }
              className="capitalize"
            >
              {order.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

