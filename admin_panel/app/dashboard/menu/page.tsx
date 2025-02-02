'use client'

import { MenuItemsTable } from "@/components/menu-items-table"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'
export default function MenuPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/'); 
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; 
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Menu Items</h2>
      </div>
      <MenuItemsTable />
    </div>
  )
}

