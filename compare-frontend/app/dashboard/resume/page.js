'use client'

import ResumeManager from '@/components/ResumeManager'

export default function ResumePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Resume Management</h1>
      <ResumeManager />
    </div>
  )
}