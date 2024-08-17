'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { authService, jobService } from '@/services/api'
import JobPostingForm from '@/components/JobPostingForm'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchUser()
    fetchJobs()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await authService.getCurrentUser()
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const fetchJobs = async () => {
    try {
      const response = await jobService.getAllJobPostings()
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Dashboard</h1>
      {user && <p className="text-gray-300">Welcome, {user.username}!</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary-400 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/resume" className="btn-primary block text-center">Manage Resume</Link>
            <Link href="/jobs" className="btn-primary block text-center">View Job Postings</Link>
            <Link href="/applications" className="btn-primary block text-center">My Applications</Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary-400 mb-4">Create Job Posting</h2>
          <JobPostingForm onJobPosted={fetchJobs} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-primary-400 mb-4">Recent Job Postings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.slice(0, 6).map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                <h3 className="text-xl font-semibold text-primary-400">{job.title}</h3>
                <p className="text-gray-300">{job.company}</p>
                <p className="text-gray-400">{job.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}