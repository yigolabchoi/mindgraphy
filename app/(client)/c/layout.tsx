import { ClientFooter } from '@/components/client/client-footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ClientFooter />
    </>
  )
}
