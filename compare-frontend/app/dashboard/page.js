'use client'

import { useState, useEffect } from 'react'
import { resumeService, jobService, applicationService } from '@/services/api'
import ResumeUploader from '@/components/ResumeUploader'
import JobList from '@/components/JobList'
import ApplicationTracker from '@/components/ApplicationTracker'

export default function Dashboard() {
  const [baseResume, setBaseResume] = useState(null)
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [resumeResponse, jobsResponse, applicationsResponse] = await Promise.all([
        resumeService.getBaseResume(),
        jobService.getAllJobPostings(),
        applicationService.getJobApplications(),
      ])
      setBaseResume(resumeResponse.data)
      setJobs(jobsResponse.data)
      setApplications(applicationsResponse.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-400">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Your Resume</h2>
          {baseResume ? (
            <div>
              <p>{baseResume.content.substring(0, 200)}...</p>
              <button className="btn-primary mt-4">Edit Resume</button>
            </div>
          ) : (
            <ResumeUploader onUpload={fetchData} />
          )}
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Job Applications</h2>
          <ApplicationTracker applications={applications} />
        </div>
      </div>
      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Job Listings</h2>
        <JobList jobs={jobs} />
      </div>
    </div>
  )
}