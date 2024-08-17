'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { authService, jobService, resumeService } from '@/services/api'
import JobPostingForm from '@/components/JobPostingForm'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [resumeStatus, setResumeStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [userResponse, jobsResponse, resumeResponse] = await Promise.all([
        authService.getCurrentUser(),
        jobService.getAllJobPostings(),
        resumeService.getBaseResume()
      ])
      setUser(userResponse.data)
      setJobs(jobsResponse.data)
      setResumeStatus(resumeResponse.data ? 'uploaded' : 'not uploaded')
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading dashboard...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Dashboard</h1>
      {user && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-300">Welcome, {user.username}!</p>
          <p className="text-gray-400">Email: {user.email}</p>
          <p className="text-gray-400">Resume Status: {resumeStatus}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary-400 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/dashboard/resume" className="btn-primary block text-center">Manage Resume</Link>
            <Link href="/dashboard/jobs" className="btn-primary block text-center">View Job Postings</Link>
            <Link href="/dashboard/applications" className="btn-primary block text-center">My Applications</Link>
            <Link href="/dashboard/interview-prep" className="btn-primary block text-center">Interview Preparation</Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary-400 mb-4">Create Job Posting</h2>
          <JobPostingForm onJobPosted={fetchData} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-primary-400 mb-4">Recent Job Postings</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-300">No job postings available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.slice(0, 6).map((job) => (
              <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                  <h3 className="text-xl font-semibold text-primary-400">{job.title}</h3>
                  <p className="text-gray-300">{job.company}</p>
                  <p className="text-gray-400">{job.location}</p>
                  <p className="text-gray-400 mt-2">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {jobs.length > 6 && (
          <div className="mt-4 text-center">
            <Link href="/dashboard/jobs" className="btn-secondary">
              View All Job Postings
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}