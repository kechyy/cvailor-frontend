"use client"
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import AuthLayout from '@/components/auth/AuthLayout'
import OAuthButtons from '@/components/auth/OAuthButtons'
import Divider from '@/components/auth/Divider'
import InputField from '@/components/auth/InputField'
import SubmitButton from '@/components/auth/SubmitButton'

type SignUpFormValues = {
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export default function SignUpPage() {
  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    },
    mode: 'onBlur'
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    register
  } = methods

  const onSubmit = async (values: SignUpFormValues) => {
    // TODO: wire to backend
    console.log('Sign up', values)
  }

  const passwordValue = watch('password')

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tailoring CVs with AI — free forever"
    >
      <OAuthButtons mode="signup" />
      <Divider />
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-2 gap-3">
            <InputField name="firstname" label="First name" placeholder="Alex" autoComplete="given-name" required />
            <InputField name="lastname" label="Last name" placeholder="Johnson" autoComplete="family-name" required />
          </div>
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
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            required
            helperText="Use at least 8 characters with letters and numbers."
            rules={{ minLength: { value: 8, message: 'Must be at least 8 characters.' } }}
          />
          <InputField
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            required
            rules={{
              validate: (value) => value === passwordValue || 'Passwords must match.'
            }}
          />

          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-brand-purple flex-shrink-0"
              {...register('terms', { required: 'You must accept the terms to continue.' })}
            />
            <label htmlFor="terms" className="text-sm text-gray-500 leading-relaxed">
              I agree to the{' '}
              <Link href="/terms" className="text-brand-purple hover:underline font-medium">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-brand-purple hover:underline font-medium">Privacy Policy</Link>
            </label>
          </div>
          {methods.formState.errors.terms && (
            <p className="text-xs text-red-500 font-medium">{methods.formState.errors.terms.message?.toString()}</p>
          )}

          <SubmitButton label="Create account →" loading={isSubmitting} />
        </form>
      </FormProvider>

      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-brand-purple font-semibold hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  )
}
