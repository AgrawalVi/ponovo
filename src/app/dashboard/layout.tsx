import Footer from '@/components/general/navigation/footer'
import ProtectedNav from '@/components/general/navigation/protected-nav'
import { TRPCReactProvider } from '@/trpc/react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TRPCReactProvider>
      <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <ProtectedNav />
        {children}
        <Footer />
      </div>
    </TRPCReactProvider>
  )
}
