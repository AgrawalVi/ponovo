import Footer from '@/components/general/navigation/footer'
import ProtectedNav from '@/components/general/navigation/protected-nav'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <ProtectedNav />
        {children}
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
