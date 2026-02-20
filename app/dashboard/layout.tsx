import Sidebar from '@/components/dashboard/Sidebar'
import MobileNav from '@/components/dashboard/MobileNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Sidebar />
      <MobileNav />
      {/* Main content — offset by sidebar width on desktop */}
      <main className="lg:ml-60 min-h-screen pb-24 lg:pb-0">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
