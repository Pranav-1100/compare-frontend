'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { jobService, applicationService } from '@/services/api'

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      const response = await jobService.getJobPostingById(id)
      setJob(response.data)
    } catch (error) {
      console.error('Error fetching job details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      await applicationService.trackJobApplication({ jobPostingId: id, status: 'applied' })
      alert('Application submitted successfully!')
    } catch (error) {
      console.error('Error applying for job:', error)
      alert('Failed to submit application. Please try again.')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!job) return <div>Job not found</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">{job.title}</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{job.company}</h2>
        <p className="text-gray-300 mb-4">{job.location}</p>
        <div className="prose prose-invert">{job.description}</div>
        <button onClick={handleApply} className="btn-primary mt-8">
          Apply Now
        </button>
      </div>
    </div>
  )
}