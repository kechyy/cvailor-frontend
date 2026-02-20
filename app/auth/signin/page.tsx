'use client'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import OAuthButtons from '@/components/auth/OAuthButtons'
import Divider from '@/components/auth/Divider'
import InputField from '@/components/auth/InputField'
import SubmitButton from '@/components/auth/SubmitButton'

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Cvailor account"
    >
      {/* OAuth */}
      <OAuthButtons mode="signin" />

      <Divider />

      {/* Email form */}
      <form className="space-y-4">
        <InputField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <Link
              href="/auth/reset-password"
              className="text-xs text-brand-purple hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <InputField
            id="password"
            label=""
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-gray-300 text-brand-purple accent-brand-purple"
          />
          <label htmlFor="remember" className="text-sm text-gray-500">
            Remember me for 30 days
          </label>
        </div>

        <SubmitButton label="Sign in →" />
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-gray-400 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-brand-purple font-semibold hover:underline">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  )
}
