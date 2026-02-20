'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F6FA] flex">

      {/* Left panel — branding */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-[45%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 60%, #1F1B4E 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-brand-purple/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[260px] h-[260px] rounded-full bg-brand-green/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-brand-purple/10 blur-2xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center">
            <span className="text-white font-bold text-base">C</span>
          </div>
          <span className="font-display text-2xl text-white">Cvailor</span>
        </Link>

        {/* Center quote */}
        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Floating CV mini card */}
            <div className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-2xl p-5 mb-8 max-w-[320px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-green/30">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face&auto=format&q=80"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Sarah Mitchell</div>
                  <div className="text-white/40 text-xs">Product Designer → Google</div>
                </div>
                <div className="ml-auto bg-brand-green/15 border border-brand-green/25 rounded-full px-2 py-0.5">
                  <span className="text-brand-green text-[10px] font-semibold">Hired ✓</span>
                </div>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                &quot;Cvailor rewrote my CV in 30 seconds. I got a callback from Google the same week I applied.&quot;
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-6">
              {[
                { value: '94%', label: 'Avg. job match score' },
                { value: '3x', label: 'More interview callbacks' },
                { value: '30s', label: 'To tailor your CV' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-white font-display text-2xl">{stat.value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="text-white/25 text-xs relative z-10">
          © 2025 Cvailor. Built with AI.
        </div>
      </motion.div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-display text-xl text-gray-900">Cvailor</span>
        </Link>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[420px]"
        >
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-display text-4xl text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-400 text-base">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>

    </div>
  )
}
