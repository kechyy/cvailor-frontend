"use client"
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import AuthLayout from '@/components/auth/AuthLayout'
import InputField from '@/components/auth/InputField'
import SubmitButton from '@/components/auth/SubmitButton'

type ResetFormValues = { email: string }

export default function ResetPasswordPage() {
  const methods = useForm<ResetFormValues>({
    defaultValues: { email: '' },
    mode: 'onBlur'
  })

  const { handleSubmit, formState: { isSubmitting } } = methods

  const onSubmit = async (values: ResetFormValues) => {
    // TODO: connect to backend
    console.log('Reset password', values)
  }

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
          <SubmitButton label="Send reset link →" loading={isSubmitting} />
        </form>
      </FormProvider>

      <p className="text-center text-sm text-gray-400 mt-6">
        Remembered it?{' '}
        <Link href="/auth/signin" className="text-brand-purple font-semibold hover:underline">Back to sign in</Link>
      </p>
    </AuthLayout>
  )
}
