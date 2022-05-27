import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useApp } from '../states/AppContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return <>{user ? children : null}</>
}

export default ProtectedRoute
