'use client'

import { useState } from 'react'
import { interviewService } from '@/services/api'

export default function SalaryNegotiation({ jobId }) {
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGetAdvice = async () => {
    setLoading(true)
    try {
      const response = await interviewService.getSalaryNegotiationAdvice(jobId)
      setAdvice(response.data.advice)
    } catch (error) {
      console.error('Error getting salary negotiation advice:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Salary Negotiation</h2>
      <button 
        onClick={handleGetAdvice} 
        className="btn-primary mb-4"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Salary Negotiation Advice'}
      </button>
      {advice && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Advice:</h3>
          <p className="text-gray-300">{advice}</p>
        </div>
      )}
    </div>
  )
}