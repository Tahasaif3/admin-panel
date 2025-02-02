import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function AdminSettings() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-order">New Order Alerts</Label>
              <Switch id="new-order" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="low-stock">Low Stock Alerts</Label>
              <Switch id="low-stock" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-summary">Daily Summary</Label>
              <Switch id="daily-summary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order-timeout">Order Timeout (minutes)</Label>
                <Input id="order-timeout" type="number" placeholder="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                <Input id="delivery-radius" type="number" placeholder="10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-cuisine">Default Cuisine</Label>
              <Input id="default-cuisine" placeholder="Italian" />
            </div>
          </CardContent>
        </Card>
        <Button className="w-full">Save Changes</Button>
      </div>
    </div>
  )
}

