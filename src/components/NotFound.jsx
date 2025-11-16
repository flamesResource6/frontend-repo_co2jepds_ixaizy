import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-6">
      <div className="text-center">
        <div className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">404</div>
        <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">Page not found</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The page you are looking for doesn’t exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">Go home</Link>
        </div>
      </div>
    </main>
  )
}
