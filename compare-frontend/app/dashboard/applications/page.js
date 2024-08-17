'use client'

import { useState, useEffect } from 'react'
import { applicationService, jobService } from '@/services/api'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await applicationService.getJobApplications()
      setApplications(response.data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setError('Failed to fetch applications. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, newStatus)
      fetchApplications()
    } catch (error) {
      console.error('Error updating application status:', error)
      setError('Failed to update application status. Please try again.')
    }
  }

  const handleWithdraw = async (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        await applicationService.withdrawApplication(applicationId)
        fetchApplications()
      } catch (error) {
        console.error('Error withdrawing application:', error)
        setError('Failed to withdraw application. Please try again.')
      }
    }
  }

  const handleViewDetails = async (applicationId) => {
    try {
      const response = await jobService.getJobPostingById(applicationId)
      setSelectedApplication(response.data)
    } catch (error) {
      console.error('Error fetching job details:', error)
      setError('Failed to fetch job details. Please try again.')
    }
  }

  if (loading) return <div>Loading applications...</div>
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
              <div className="mt-4 space-x-2">
                <button 
                  onClick={() => handleViewDetails(application.jobPosting.id)} 
                  className="btn-primary"
                >
                  View Details
                </button>
                <select 
                  onChange={(e) => handleStatusUpdate(application.id, e.target.value)}
                  value={application.status}
                  className="bg-gray-700 text-white rounded-md"
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button 
                  onClick={() => handleWithdraw(application.id)}
                  className="btn-secondary"
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-primary-400 mb-4">{selectedApplication.title}</h2>
            <p className="text-gray-300 mb-2"><strong>Company:</strong> {selectedApplication.company}</p>
            <p className="text-gray-300 mb-2"><strong>Location:</strong> {selectedApplication.location}</p>
            <p className="text-gray-300 mb-4"><strong>Description:</strong> {selectedApplication.description}</p>
            <button onClick={() => setSelectedApplication(null)} className="btn-primary">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}