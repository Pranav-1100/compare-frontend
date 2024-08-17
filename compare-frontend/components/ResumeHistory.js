'use client'

import { useState, useEffect } from 'react'
import { resumeService } from '@/services/api'

export default function ResumeHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResumeHistory()
  }, [])

  const fetchResumeHistory = async () => {
    try {
      setLoading(true)
      const response = await resumeService.getResumeHistory()
      setHistory(response.data)
    } catch (err) {
      console.error('Error fetching resume history:', err)
      setError('Failed to fetch resume history')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading resume history...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Resume History</h3>
      {history.map((item) => (
        <div key={item.id} className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-300">Created: {new Date(item.createdAt).toLocaleString()}</p>
          <p className="text-gray-300">Similarity: {item.similarity}</p>
        </div>
      ))}
    </div>
  )
}