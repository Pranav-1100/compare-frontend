'use client'

import { useState } from 'react'
import { resumeService } from '@/services/api'

export default function ResumeImprover() {
  const [improving, setImproving] = useState(false)
  const [suggestions, setSuggestions] = useState(null)
  const [error, setError] = useState('')

  const handleImprove = async () => {
    setImproving(true)
    setError('')
    try {
      const response = await resumeService.improveResume()
      setSuggestions(response.data.suggestions)
    } catch (err) {
      console.error('Error improving resume:', err)
      setError('Failed to get improvement suggestions. Please try again.')
    } finally {
      setImproving(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Improve Your Resume</h3>
      <button
        onClick={handleImprove}
        disabled={improving}
        className="btn-primary"
      >
        {improving ? 'Getting Suggestions...' : 'Get Improvement Suggestions'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {suggestions && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Suggestions:</h4>
          <p className="text-gray-300">{suggestions}</p>
        </div>
      )}
    </div>
  )
}