'use client'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import InputField from '@/components/auth/InputField'
import SubmitButton from '@/components/auth/SubmitButton'

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send a reset link"
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-brand-purple/8 border border-brand-purple/15 rounded-2xl flex items-center justify-center mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B4FCF" strokeWidth="1.8">
          <rect x="2" y="4" width="20" height="16" rx="3"/>
          <path d="M2 8l10 6 10-6"/>
        </svg>
      </div>

      <form className="space-y-4">
        <InputField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        <SubmitButton label="Send reset link →" />
      </form>

      <p className="text-center text-sm text-gray-400 mt-6">
        Remembered it?{' '}
        <Link href="/auth/signin" className="text-brand-purple font-semibold hover:underline">Back to sign in</Link>
      </p>
    </AuthLayout>
  )
}
