'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { authService } from '@/services/api'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await authService.getCurrentUser()
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.push('/')
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-white font-bold text-xl cursor-pointer">AI Resume Platform</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Login</span>
                </Link>
                <Link href="/register">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}