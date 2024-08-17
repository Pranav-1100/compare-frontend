'use client'

import { useState } from 'react'
import { jobService, interviewService } from '@/services/api'
import MockInterview from '@/components/MockInterview'
import InterviewQuestions from '@/components/InterviewQuestions'
import SalaryNegotiation from '@/components/SalaryNegotiation'

export default function InterviewPrepPage() {
  const [selectedJobId, setSelectedJobId] = useState(null)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Interview Preparation</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Select a Job for Preparation</h2>
        <JobSelector onSelect={setSelectedJobId} />
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

function JobSelector({ onSelect }) {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await jobService.getAllJobPostings()
        setJobs(response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
    fetchJobs()
  }, [])

  return (
    <select 
      onChange={(e) => onSelect(e.target.value)}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-700 text-white"
    >
      <option value="">Select a job</option>
      {jobs.map((job) => (
        <option key={job.id} value={job.id}>
          {job.title} at {job.company}
        </option>
      ))}
    </select>
  )
}