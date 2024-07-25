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
      <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto] overflow-x-hidden sm:grid-rows-[1fr_auto]">
        <div className="block sm:hidden">
          <MobileNav />
        </div>
        <div className="flex w-full overflow-x-hidden">
          <SidebarNav />
          <div className="flex w-full flex-col overflow-x-hidden p-4">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </TRPCReactProvider>
  )
}
