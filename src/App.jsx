import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
export default function App() {
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    // this pass the error to the nearest error boundary
    showBoundary(new Error('this is simple error'))
  })
  return <h1>app</h1>
}
