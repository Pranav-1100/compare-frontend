'use client'

import { useState, useEffect } from 'react'
import { jobService, interviewService } from '@/services/api'
import MockInterview from '@/components/MockInterview'
import InterviewQuestions from '@/components/InterviewQuestions'
import SalaryNegotiation from '@/components/SalaryNegotiation'

export default function InterviewPrepPage() {
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await jobService.getAllJobPostings()
        setJobs(response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setError('Failed to fetch jobs. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Interview Preparation</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Select a Job for Preparation</h2>
        <select 
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-700 text-white"
        >
          <option value="">Select a job</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title} at {job.company}
            </option>
          ))}
        </select>
      </div>

      {selectedJobId && (
        <>
          <MockInterview jobId={selectedJobId} />
          <InterviewQuestions jobId={selectedJobId} />
          <SalaryNegotiation jobId={selectedJobId} />
        </>
      )}
    </div>
  )
}