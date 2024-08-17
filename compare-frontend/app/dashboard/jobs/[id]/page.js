'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { jobService, applicationService } from '@/services/api'

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [applicationStatus, setApplicationStatus] = useState(null)

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      setLoading(true)
      const response = await jobService.getJobPostingById(id)
      setJob(response.data)
      // Check if the user has already applied
      const applicationResponse = await applicationService.checkApplicationStatus(id)
      setApplicationStatus(applicationResponse.data.status)
    } catch (error) {
      console.error('Error fetching job details:', error)
      setError('Failed to load job details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      setLoading(true)
      await applicationService.trackJobApplication({ jobPostingId: id, status: 'applied' })
      setApplicationStatus('applied')
      alert('Application submitted successfully!')
    } catch (error) {
      console.error('Error applying for job:', error)
      setError('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!job) return <div>Job not found</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">{job.title}</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{job.company}</h2>
        <p className="text-gray-300 mb-4">{job.location}</p>
        <div className="prose prose-invert mb-6">{job.description}</div>
        {applicationStatus === 'applied' ? (
          <p className="text-green-500 font-semibold">You have already applied for this job.</p>
        ) : (
          <button 
            onClick={handleApply} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Applying...' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  )
}