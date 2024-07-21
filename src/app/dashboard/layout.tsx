import Footer from '@/components/general/navigation/footer'
import {
  MobileNav,
  SidebarNav,
} from '@/components/general/navigation/protected-nav'
import { TRPCReactProvider } from '@/trpc/react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TRPCReactProvider>
      <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] sm:grid-rows-[1fr_auto]">
        <div className="block sm:hidden">
          <MobileNav />
        </div>
        <div className="flex">
          <SidebarNav />
          {children}
        </div>
        <Footer />
      </div>
    </TRPCReactProvider>
  )
}
