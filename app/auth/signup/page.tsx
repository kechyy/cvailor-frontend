'use client'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import OAuthButtons from '@/components/auth/OAuthButtons'
import Divider from '@/components/auth/Divider'
import InputField from '@/components/auth/InputField'
import SubmitButton from '@/components/auth/SubmitButton'

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tailoring CVs with AI — free forever"
    >
      <OAuthButtons mode="signup" />
      <Divider />
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <InputField id="firstname" label="First name" placeholder="Alex" required autoComplete="given-name" />
          <InputField id="lastname" label="Last name" placeholder="Johnson" required autoComplete="family-name" />
        </div>
        <InputField id="email" label="Email address" type="email" placeholder="you@example.com" required autoComplete="email" />
        <InputField id="password" label="Password" type="password" placeholder="Min. 8 characters" required autoComplete="new-password" />
        <InputField id="confirm-password" label="Confirm password" type="password" placeholder="Repeat your password" required autoComplete="new-password" />

        <div className="flex items-start gap-2.5">
          <input type="checkbox" id="terms" required className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-brand-purple flex-shrink-0" />
          <label htmlFor="terms" className="text-sm text-gray-500 leading-relaxed">
            I agree to the{' '}
            <Link href="/terms" className="text-brand-purple hover:underline font-medium">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-brand-purple hover:underline font-medium">Privacy Policy</Link>
          </label>
        </div>

        <SubmitButton label="Create account →" />
      </form>

      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-brand-purple font-semibold hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  )
}
