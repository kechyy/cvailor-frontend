'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import OAuthButtons from '@/components/auth/OAuthButtons'
import Divider from '@/components/auth/Divider'
import { FormField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { signInSchema, type SignInFormData } from '@/lib/validations'

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: SignInFormData) => {
    // REPLACE WITH: signIn('credentials', data)
    await new Promise(r => setTimeout(r, 1000))
    window.location.href = '/dashboard'
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Cvailor account">
      <OAuthButtons mode="signin" />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField label="Email address" type="email" placeholder="you@example.com"
          error={errors.email?.message} autoComplete="email" {...register('email')} />
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="block text-sm font-semibold text-gray-700">Password</span>
            <Link href="/auth/reset-password" className="text-xs text-brand-purple hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
          <FormField label="" type="password" placeholder="••••••••"
            error={errors.password?.message} autoComplete="current-password" {...register('password')} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 accent-brand-purple" {...register('remember')} />
          <label htmlFor="remember" className="text-sm text-gray-500">Remember me for 30 days</label>
        </div>
        <Button type="submit" size="lg" loading={isSubmitting} className="w-full justify-center">
          Sign in →
        </Button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-brand-purple font-semibold hover:underline">Sign up free</Link>
      </p>
    </AuthLayout>
  )
}
