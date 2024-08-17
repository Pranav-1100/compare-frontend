export default function ApplicationTracker({ applications }) {
    return (
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="bg-background-lighter p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-primary-400">{application.jobPosting.title}</h3>
            <p className="text-gray-400">{application.jobPosting.company}</p>
            <p className="text-gray-400">Status: {application.status}</p>
            <p className="text-gray-400">Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    )
  }