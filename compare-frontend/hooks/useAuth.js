import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/api'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await authService.getCurrentUser()
      setIsAuthenticated(true)
    } catch (error) {
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  return { isAuthenticated, isLoading }
}