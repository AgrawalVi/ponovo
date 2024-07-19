import Footer from '@/components/general/navigation/footer'
import UnprotectedNav from '@/components/general/navigation/unprotected-nav'

export default function UnprotectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <UnprotectedNav />
      {children}
      <Footer />
    </div>
  )
}
