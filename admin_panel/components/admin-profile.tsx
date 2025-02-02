import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AdminProfile() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Admin User</h2>
              <p className="text-sm text-muted-foreground">admin@speedyqeats.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Role</h3>
              <p>Super Admin</p>
            </div>
            <div>
              <h3 className="font-semibold">Joined</h3>
              <p>January 1, 2023</p>
            </div>
            <div>
              <h3 className="font-semibold">Last Login</h3>
              <p>Today at 09:30 AM</p>
            </div>
            <div>
              <h3 className="font-semibold">Restaurants Managed</h3>
              <p>15</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

