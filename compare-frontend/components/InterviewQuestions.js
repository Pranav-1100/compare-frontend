'use client'

import { useState, useEffect } from 'react'
import { jobService } from '@/services/api'

export default function InterviewQuestions({ jobId }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        const response = await jobService.getInterviewQuestions(jobId)
        setQuestions(response.data.questions || [])
      } catch (error) {
        console.error('Error fetching interview questions:', error)
        setError('Failed to fetch interview questions. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    if (jobId) {
      fetchQuestions()
    }
  }, [jobId])

  if (loading) return <div>Loading questions...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (questions.length === 0) return <div>No interview questions available for this job.</div>

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Potential Interview Questions</h2>
      <ul className="list-disc pl-5 space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="text-gray-300">{question}</li>
        ))}
      </ul>
    </div>
  )
}