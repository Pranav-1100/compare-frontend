'use client'

import { useState, useEffect } from 'react'
import { jobService } from '@/services/api'

export default function InterviewQuestions({ jobId }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        const response = await jobService.getInterviewQuestions(jobId)
        setQuestions(response.data.questions)
      } catch (error) {
        console.error('Error fetching interview questions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [jobId])

  if (loading) return <div>Loading questions...</div>

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