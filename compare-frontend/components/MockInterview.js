'use client'

import { useState } from 'react'
import { interviewService } from '@/services/api'

export default function MockInterview({ jobId }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await interviewService.mockInterview(jobId, { answer })
      setFeedback(response.data.feedback)
      setQuestion(response.data.followUpQuestion)
      setAnswer('')
    } catch (error) {
      console.error('Error during mock interview:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Mock Interview</h2>
      {question ? (
        <p className="text-lg mb-4">{question}</p>
      ) : (
        <button 
          onClick={() => setQuestion("Tell me about yourself.")}
          className="btn-primary mb-4"
        >
          Start Mock Interview
        </button>
      )}
      {question && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-700 border-gray-600"
            rows={4}
            placeholder="Type your answer here..."
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Answer'}
          </button>
        </form>
      )}
      {feedback && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Feedback:</h3>
          <p className="text-gray-300">{feedback}</p>
        </div>
      )}
    </div>
  )
}