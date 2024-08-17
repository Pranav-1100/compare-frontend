'use client'

import { useState } from 'react'
import { resumeService } from '@/services/api'

export default function BaseResumeUploader({ onUpload }) {
  const [content, setContent] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setUploading(true)

    try {
      await resumeService.createBaseResume({ content })
      onUpload()
    } catch (err) {
      console.error('Error uploading base resume:', err)
      setError('Failed to upload base resume. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="baseResume" className="block text-sm font-medium text-gray-400 mb-2">
          Enter Your Base Resume
        </label>
        <textarea
          id="baseResume"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-700 border-gray-600"
          placeholder="Paste or type your base resume content here..."
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={uploading || !content.trim()}
        className="btn-primary w-full"
      >
        {uploading ? 'Uploading...' : 'Upload Base Resume'}
      </button>
    </form>
  )
}