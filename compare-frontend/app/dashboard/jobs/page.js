'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { jobService } from '@/services/api'

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Job Postings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
              <h2 className="text-xl font-semibold text-primary-400">{job.title}</h2>
              <p className="text-gray-300">{job.company}</p>
              <p className="text-gray-400">{job.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}