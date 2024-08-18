'use client'

import { useState, useEffect } from 'react'
import { jobService } from '@/services/api'

export default function InterviewQuestions({ jobId }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchQuestions() {
      if (!jobId) return
      try {
        setLoading(true)
        const response = await jobService.getInterviewQuestions(jobId)
        if (typeof response.data.questions === 'string') {
          // Split the string into an array of questions
          const questionsArray = response.data.questions.split('\n').filter(q => q.trim() !== '')
          setQuestions(questionsArray)
        } else {
          console.error('Unexpected response format:', response.data)
          setError('Received unexpected data format from server')
        }
      } catch (error) {
        console.error('Error fetching interview questions:', error)
        setError('Failed to fetch interview questions. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [jobId])

  if (loading) return <div>Loading questions...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (questions.length === 0) return <div>No interview questions available for this job.</div>

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Potential Interview Questions</h2>
      <ol className="list-decimal pl-5 space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="text-gray-300">{question.replace(/^\d+\.\s*/, '')}</li>
        ))}
      </ol>
    </div>
  )
}