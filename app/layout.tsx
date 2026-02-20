import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartCV — AI-Tailored Resumes in Minutes',
  description: 'Upload your CV, paste a job description, and let AI craft the perfect tailored resume and cover letter.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
