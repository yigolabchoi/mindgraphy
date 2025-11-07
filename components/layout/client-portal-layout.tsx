'use client'

import { ClientPortalNav } from './client-portal-nav'

interface ClientPortalLayoutProps {
  children: React.ReactNode
  token: string
}

export function ClientPortalLayout({ children, token }: ClientPortalLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <ClientPortalNav token={token} />
      <main className="container mx-auto p-4 md:p-6 max-w-7xl">
        {children}
      </main>
    </div>
  )
}
