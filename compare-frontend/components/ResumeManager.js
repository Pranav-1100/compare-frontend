'use client'

import { useState, useEffect } from 'react'
import { resumeService } from '@/services/api'
import BaseResumeUploader from './BaseResumeUploader'
import CompareResumeUploader from './CompareResumeUploader'
import ResumeHistory from './ResumeHistory'
import ResumeImprover from './ResumeImprover'

export default function ResumeManager() {
  const [baseResume, setBaseResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBaseResume()
  }, [])

  const fetchBaseResume = async () => {
    try {
      setLoading(true)
      const response = await resumeService.getBaseResume()
      setBaseResume(response.data)
    } catch (err) {
      console.error('Error fetching base resume:', err)
      setError('Failed to fetch base resume')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-8">
      {!baseResume ? (
        <BaseResumeUploader onUpload={fetchBaseResume} />
      ) : (
        <>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Base Resume</h3>
            <p className="text-gray-300">{baseResume.content.substring(0, 200)}...</p>
          </div>
          <CompareResumeUploader />
          <ResumeImprover />
          <ResumeHistory />
        </>
      )}
    </div>
  )
}