"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useAuth } from "@/context/AuthContext" 

interface LoginCredentials {
  email: string
  password: string
}

const VALID_CREDENTIALS = {
  email:process.env.NEXT_PUBLIC_EMAIL,
  password: process.env.NEXT_PUBLIC_PASSWORD

}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login } = useAuth() 
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError(null)
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      if (!credentials.email || !credentials.password) {
        throw new Error("Please fill in all fields")
      }

      if (credentials.email === VALID_CREDENTIALS.email && credentials.password === VALID_CREDENTIALS.password) {
        login()
        router.replace("/dashboard")
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </Label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="password"
            autoComplete="email"
            required
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="••••••••"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="••••••••"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  )
}

