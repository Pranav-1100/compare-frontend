'use client'

import { useState } from 'react'
import { resumeService } from '@/services/api'

export default function ResumeUploader({ onUpload }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('resume', file)

    try {
      await resumeService.createBaseResume(formData)
      onUpload()
    } catch (error) {
      console.error('Error uploading resume:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-400">
          Upload Resume
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-600 file:text-white
                    hover:file:bg-primary-700"
        />
      </div>
      <button
        type="submit"
        disabled={!file || uploading}
        className="btn-primary w-full"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}