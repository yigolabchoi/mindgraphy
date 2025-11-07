'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants'

export default function SettingsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace(ROUTES.ADMIN_SETTINGS_PRODUCTS)
  }, [router])

  return null
}

