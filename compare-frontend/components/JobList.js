import Link from 'next/link'

export default function JobList({ jobs }) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-background-lighter p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-primary-400">{job.title}</h3>
          <p className="text-gray-400">{job.company}</p>
          <p className="text-gray-400">{job.location}</p>
          <Link href={`/jobs/${job.id}`} className="btn-primary mt-2 inline-block">
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}