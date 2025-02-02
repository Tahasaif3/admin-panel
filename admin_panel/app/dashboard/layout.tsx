"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed left-4 top-4 z-40">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex flex-col h-full">
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-2 px-4">Speedy Qeats</h2>
              <DashboardNav setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-lg font-semibold">Speedy Qeats</h2>
            </div>
            <DashboardNav />
          </div>
        </div>
      </div>

      
      <div className="md:pl-64 flex flex-col flex-1">
      <header className="sticky top-0 z-10 md:static bg-white border-b border-gray-200 flex h-14 items-center px-4 py-4 sm:px-6 md:px-8">
  <div className="flex items-center w-full justify-between">
    <h1 className="text-lg font-semibold hidden sm:block">Dashboard</h1>
    <div className="ml-auto">
      <UserNav />
    </div>
  </div>
</header>


  <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
</div>

    </div>
  )
}

