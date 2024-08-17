'use client'

import { useState } from 'react'
import { resumeService } from '@/services/api'

export default function ResumeUploader({ onUpload }) {
  const [uploadType, setUploadType] = useState('text') // 'text' or 'pdf'
  const [textContent, setTextContent] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleTextChange = (e) => {
    setTextContent(e.target.value)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
    } else {
      setFile(null)
      setError('Please upload a PDF file')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setUploading(true)

    try {
      if (uploadType === 'text') {
        await resumeService.createBaseResume({ content: textContent })
      } else {
        if (!file) {
          setError('Please select a PDF file')
          setUploading(false)
          return
        }
        const formData = new FormData()
        formData.append('resume', file)
        await resumeService.createBaseResume(formData)
      }
      onUpload()
    } catch (error) {
      console.error('Error uploading resume:', error)
      setError('Failed to upload resume. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Upload Type
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setUploadType('text')}
            className={`px-4 py-2 rounded-md ${
              uploadType === 'text'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => setUploadType('pdf')}
            className={`px-4 py-2 rounded-md ${
              uploadType === 'pdf'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            PDF
          </button>
        </div>
      </div>

      {uploadType === 'text' ? (
        <div>
          <label htmlFor="resumeText" className="block text-sm font-medium text-gray-400 mb-2">
            Enter Your Resume Text
          </label>
          <textarea
            id="resumeText"
            rows={10}
            value={textContent}
            onChange={handleTextChange}
            className="w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-700 border-gray-600"
            placeholder="Paste or type your resume content here..."
          />
        </div>
      ) : (
        <div>
          <label htmlFor="resumePdf" className="block text-sm font-medium text-gray-400 mb-2">
            Upload Resume PDF
          </label>
          <input
            type="file"
            id="resumePdf"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-600 file:text-white
                      hover:file:bg-primary-700"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={uploading || (uploadType === 'pdf' && !file) || (uploadType === 'text' && !textContent.trim())}
        className="btn-primary w-full"
      >
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </form>
  )
}