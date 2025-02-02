import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { AuthProvider } from '@/context/AuthContext';

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
      <AuthProvider>
      {children}
      </AuthProvider>
      </body>
    </html>
  )
}

