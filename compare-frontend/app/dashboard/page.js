import ResumeUploader from '@/components/ResumeUploader'
import JobList from '@/components/JobList'
import ApplicationTracker from '@/components/ApplicationTracker'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <ResumeUploader />
      <JobList />
      <ApplicationTracker />
    </div>
  )
}