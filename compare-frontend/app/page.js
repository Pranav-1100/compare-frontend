import Link from 'next/link'
import { FaRocket, FaChartLine, FaUserTie } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-primary-400 mb-6">AI-Powered Resume Platform</h1>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
        Revolutionize your job search with cutting-edge AI tools and insights
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<FaRocket className="text-4xl text-primary-500" />}
          title="Smart Resume Analysis"
          description="Get instant feedback and suggestions to improve your resume"
        />
        <FeatureCard
          icon={<FaChartLine className="text-4xl text-primary-500" />}
          title="Career Insights"
          description="Discover trending skills and opportunities in your field"
        />
        <FeatureCard
          icon={<FaUserTie className="text-4xl text-primary-500" />}
          title="Interview Preparation"
          description="Practice with AI-generated interview questions tailored to your profile"
        />
      </div>
      <div className="space-x-4">
        <Link href="/login" className="btn-primary">
          Get Started
        </Link>
        <Link href="/register" className="btn-primary bg-secondary-600 hover:bg-secondary-700">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="card">
      <div className="flex flex-col items-center">
        {icon}
        <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}