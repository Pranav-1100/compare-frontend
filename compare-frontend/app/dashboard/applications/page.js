'use client'

import { useState, useEffect } from 'react'
import { applicationService } from '@/services/api'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await applicationService.getJobApplications()
      setApplications(response.data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setError('Failed to fetch applications. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">My Applications</h1>
      {applications.length === 0 ? (
        <p className="text-gray-300">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary-400">{application.jobPosting.title}</h2>
              <p className="text-gray-300">{application.jobPosting.company}</p>
              <p className="text-gray-400">Status: {application.status}</p>
              <p className="text-gray-400">Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}