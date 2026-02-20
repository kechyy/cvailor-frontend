"use client"
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import AuthLayout from '@/components/auth/AuthLayout'
import InputField from '@/components/auth/InputField'
import SubmitButton from '@/components/auth/SubmitButton'

type NewPasswordFormValues = {
  newPassword: string
  confirmPassword: string
}

export default function NewPasswordPage() {
  const methods = useForm<NewPasswordFormValues>({
    defaultValues: { newPassword: '', confirmPassword: '' },
    mode: 'onBlur'
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch
  } = methods

  const newPasswordValue = watch('newPassword')

  const onSubmit = async (values: NewPasswordFormValues) => {
    // TODO: connect to backend
    console.log('Set new password', values)
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Must be at least 8 characters"
    >
      {/* Password strength indicator */}
      <div className="mb-6">
        <div className="flex gap-1.5 mb-1.5">
          {['bg-brand-green', 'bg-brand-green', 'bg-gray-200', 'bg-gray-200'].map((c, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${c} transition-all`} />
          ))}
        </div>
        <p className="text-xs text-gray-400">Password strength: <span className="text-yellow-500 font-semibold">Fair</span></p>
      </div>

      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            name="newPassword"
            label="New password"
            type="password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            required
            rules={{ minLength: { value: 8, message: 'Must be at least 8 characters.' } }}
          />
          <InputField
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            placeholder="Repeat new password"
            autoComplete="new-password"
            required
            rules={{ validate: (value) => value === newPasswordValue || 'Passwords must match.' }}
          />

          {/* Requirements checklist */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2">
            {[
              { label: 'At least 8 characters', met: newPasswordValue.length >= 8 },
              { label: 'One uppercase letter', met: /[A-Z]/.test(newPasswordValue) },
              { label: 'One number or symbol', met: /[0-9!@#$%^&*]/.test(newPasswordValue) },
            ].map((req) => (
              <div key={req.label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${req.met ? 'bg-brand-green' : 'bg-gray-200'}`}>
                  {req.met && (
                    <svg width="8" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-xs ${req.met ? 'text-gray-600' : 'text-gray-400'}`}>{req.label}</span>
              </div>
            ))}
          </div>

          <SubmitButton label="Update password →" loading={isSubmitting} />
        </form>
      </FormProvider>

      <p className="text-center text-sm text-gray-400 mt-6">
        <Link href="/auth/signin" className="text-brand-purple font-semibold hover:underline">← Back to sign in</Link>
      </p>
    </AuthLayout>
  )
}
