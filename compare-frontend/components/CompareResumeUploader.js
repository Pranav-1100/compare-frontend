'use client'

import { useState } from 'react'
import { resumeService } from '@/services/api'

export default function CompareResumeUploader({ baseResumeId }) {
  const [content, setContent] = useState('')
  const [comparing, setComparing] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setComparing(true)

    try {
      const response = await resumeService.compareResume({ content })
      setResult(response.data)
    } catch (err) {
      console.error('Error comparing resume:', err)
      setError('Failed to compare resume. Please try again.')
    } finally {
      setComparing(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="compareResume" className="block text-sm font-medium text-gray-400 mb-2">
            Enter Resume to Compare
          </label>
          <textarea
            id="compareResume"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-700 border-gray-600"
            placeholder="Paste or type the resume you want to compare here..."
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={comparing || !content.trim()}
          className="btn-primary w-full"
        >
          {comparing ? 'Comparing...' : 'Compare Resume'}
        </button>
      </form>
      {result && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Comparison Result</h3>
          <p className="text-gray-300">Similarity Score: {result.comparison.similarityScore}</p>
          <p className="text-gray-300">Explanation: {result.comparison.explanation}</p>
        </div>
      )}
    </div>
  )
}