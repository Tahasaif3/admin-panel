"use client"

import { OrdersTable } from "@/components/orders-table"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'

export default function OrdersPage() {
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
      <h2 className="text-2xl font-bold">Orders Management</h2>
      <OrdersTable />
    </div>
  )
}

