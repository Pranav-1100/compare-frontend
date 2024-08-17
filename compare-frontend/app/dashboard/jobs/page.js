'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { jobService } from '@/services/api'

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await jobService.getAllJobPostings()
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setError('Failed to load jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading jobs...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Job Postings</h1>
      {jobs.length === 0 ? (
        <p className="text-gray-300">No job postings available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                <h2 className="text-xl font-semibold text-primary-400">{job.title}</h2>
                <p className="text-gray-300">{job.company}</p>
                <p className="text-gray-400">{job.location}</p>
                {job.createdAt && (
                  <p className="text-gray-400 mt-2">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}