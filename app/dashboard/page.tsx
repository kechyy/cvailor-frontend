'use client'
import { motion } from 'framer-motion'
import TopBar from '@/components/dashboard/TopBar'
import StatCard from '@/components/dashboard/StatCard'
import CVCard from '@/components/dashboard/CVCard'
import InsightsPanel from '@/components/dashboard/InsightsPanel'
import QuickActions from '@/components/dashboard/QuickActions'
import { mockStats, mockCVs, mockInsights, mockUser } from '@/mock/dashboardMock'

const statCards = [
  {
    label: 'CVs Created',
    value: mockStats.cvsCreated,
    delta: mockStats.cvsCreatedDelta,
    accent: '#5B4FCF',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
  },
  {
    label: 'Avg ATS Score',
    value: `${mockStats.avgAtsScore}%`,
    delta: mockStats.avgAtsDelta,
    accent: '#2ECC8F',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  },
  {
    label: 'Jobs Applied',
    value: mockStats.jobsApplied,
    delta: mockStats.jobsAppliedDelta,
    accent: '#F59E0B',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  },
  {
    label: 'Top Template',
    value: mockStats.topTemplate,
    delta: mockStats.topTemplateSub,
    accent: '#8B5CF6',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  },
]

export default function DashboardPage() {
  const firstName = mockUser.name.split(' ')[0]

  return (
    <>
      <TopBar
        title={`Welcome back, ${firstName} 👋`}
        subtitle="Here&apos;s what&apos;s happening with your applications"
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} index={i} />
        ))}
      </div>

      {/* CVs + Insights */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 mb-8">
        {/* Recent CVs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800 text-sm">Recent CVs</h2>
            <a href="/dashboard/cvs" className="text-xs text-brand-purple font-medium hover:underline">View all</a>
          </div>
          {mockCVs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-3 text-2xl">📄</div>
              <p className="text-sm font-semibold text-gray-600 mb-1">No CVs yet</p>
              <p className="text-xs text-gray-400">Build your first tailored CV in under 2 minutes</p>
            </div>
          ) : (
            <div>
              {mockCVs.map((cv, i) => <CVCard key={cv.id} cv={cv} index={i} />)}
            </div>
          )}
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <InsightsPanel insights={mockInsights} />
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick actions</p>
        <QuickActions />
      </motion.div>
    </>
  )
}
