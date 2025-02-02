'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; 
import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); 
    }
  }, [isAuthenticated, router]);

  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <Image src="/Logo.webp" alt="Speedy Qeats Logo" width={120} height={120} className="mx-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to Speedy Qeats</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to your admin account</p>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/login1.webp"
          alt="Restaurant interior"
          layout="fill"
        />
      </div>
    </div>
  )
}

