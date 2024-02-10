import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from 'react-error-boundary'

function fallbackRender({ error, resetErrorBoundary }) {
  //   resetErrorBoundary()
  // to reset the error boundary and retry the render.

  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    fallbackRender={fallbackRender}
    onReset={(details) => {
      // Reset the state of your app so the error doesn't happen again
    }}
    // resetKeys={
    //   //some key
    // }
  >
    <App />
  </ErrorBoundary>
)
