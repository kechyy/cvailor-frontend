"use client"
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import AuthLayout from '@/components/auth/AuthLayout'
import OAuthButtons from '@/components/auth/OAuthButtons'
import Divider from '@/components/auth/Divider'
import InputField from '@/components/auth/InputField'
import SubmitButton from '@/components/auth/SubmitButton'

type SignInFormValues = {
  email: string
  password: string
  remember: boolean
}

export default function SignInPage() {
  const methods = useForm<SignInFormValues>({
    defaultValues: { email: '', password: '', remember: false },
    mode: 'onBlur'
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    register
  } = methods

  const onSubmit = async (values: SignInFormValues) => {
    // TODO: hook up to backend / next-auth
    console.log('Sign in', values)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Cvailor account"
    >
      {/* OAuth */}
      <OAuthButtons mode="signin" />

      <Divider />

      {/* Email form */}
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            name="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            rules={{
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                message: 'Enter a valid email address.'
              }
            }}
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
              name="password"
              label=""
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              rules={{ minLength: { value: 8, message: 'Must be at least 8 characters.' } }}
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 text-brand-purple accent-brand-purple"
              {...register('remember')}
            />
            <label htmlFor="remember" className="text-sm text-gray-500">
              Remember me for 30 days
            </label>
          </div>

          <SubmitButton label="Sign in →" loading={isSubmitting} />
        </form>
      </FormProvider>

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
