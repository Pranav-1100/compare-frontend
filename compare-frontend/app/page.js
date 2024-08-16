import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to AI Resume Platform</h1>
      <p className="text-xl text-gray-300 mb-8">Enhance your job search with AI-powered tools</p>
      <div className="space-x-4">
        <Link href="/login" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
        <Link href="/register" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Register
        </Link>
      </div>
    </div>
  )
}