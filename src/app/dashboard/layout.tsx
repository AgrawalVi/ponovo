import { AppSidebar } from '@/components/app-sidebar'
import Footer from '@/components/general/navigation/footer'
import {
  MobileNav,
  SidebarNav,
} from '@/components/general/navigation/protected-nav'
import {
  Breadcrumb,
  BreadcrumbPage,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { currentUser } from '@/lib/auth'
import { TRPCReactProvider } from '@/trpc/react'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <TRPCReactProvider>
      <SidebarProvider>
        <AppSidebar
          user={{
            name: user.user.name,
            email: user.user.email,
            image: user.user.image ?? null,
          }}
        />
        <SidebarInset>
          <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="w-full flex-1 overflow-x-hidden p-4">
              {children}
            </div>
            <Footer />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TRPCReactProvider>
  )
}
