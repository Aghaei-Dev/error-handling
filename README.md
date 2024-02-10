# Global Error Handling In React

## Why Error Handling?

because we can't always predict or prevent errors, but we can certainly control how they are handled. React has no built-in mechanism to recover from errors happening during rendering. so we see a blank page and this is not ideal !

## Different Types of React Errors

- Syntax Error : occur when there is a mistake in the structure of your code.typically caused by typos, missing or misplaced characters, or following the programming language syntax wrongly .

```js
//Wrong
fi(condition{

}

//correct
if(condition){

}
```

- Reference Errors :occur in a program when you try to use a variable or function that has not been defined so the compiler / interpreter can't find the reference.

```js
// ---- Undefined Variables
//Wrong
console.log(number)

//correct
const number = 10
console.log(number)

// ----Misspelled Variables or Functions
//Wrong
const number = 10
console.log(numbr)

//correct
const number = 10
console.log(number)

// ----The Scopes
//if you want access let and const that defined in a function or a block of code
// you must do that in that block of code not outside of them.

//Wrong
function sum(num1, num2) {
  if (true) {
    const result = num1 + num2
  }
  console.log(result)
}

//correct
function sum(num1, num2) {
  if (true) {
    const result = num1 + num2
    console.log(result)
  }
}
```

- Accessing Properties of Undefined Objects
- Type Errors
- Incorrect Data Type for an Operation
- Mismatched Data Types in Arithmetic Operations
- Undefined or Null Values in Operations
- Incorrect Usage of Functions

```js
// Wrong
const number = 10
const result = String.toLowerCase(number)

// Correct
const number = 10
const result = String(number).toLowerCase()
```

## So What we can do?

1- `window.onerror` : window.onerror has some limitations, and it may not capture all types of errors, such as syntax errors or errors in asynchronous code.

```js
window.onerror = function (message, source, lineNumber, colNumber, error) {
  // Error Type
  console.error('Error:', message)

  // Witch file (The source of error)
  console.error('Source:', source)

  //integer line and column
  console.error('Line Number:', lineNumber)
  console.error('Column Number:', colNumber)

  console.error('Error Object:', error)

  // Return true to prevent the default browser error handling
  return true
}
```

2- Unhandled Promise Rejections : when we work with asynchronous code (with promises in JavaScript) we must handle the errors to prevent Unhandled Promise Rejections.
occur when a promise is rejected but there is no `.catch()`.
we can use `unhandledrejection` event to handle this issues.

```js
const unhandledPromise = new Promise((resolve, reject) => {
  reject(new Error('This Promise is not handled'))
})

unhandledPromise
  .then((result) => console.log(result))
  .catch((error) => console.error('Error:', error))
```

## Error Boundaries

- install the `react-error-boundary`

```js

# npm

npm install react-error-boundary

# pnpm

pnpm add react-error-boundary

# yarn

yarn add react-error-boundary

```

- the simplest Error Boundary show a default UI .dose not matter what is the error

```js
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from 'react-error-boundary'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <App />
  </ErrorBoundary>
)
```

> wrap whole app with `ErrorErrorBoundary`, when an error appear the fallback shown.

- returning a fallback UI based on a thrown value

```js
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
  >
    <App />
  </ErrorBoundary>
)
```

- With hook
  hook for imperatively showing or dismissing error boundaries.

```js
import { useErrorBoundary } from 'react-error-boundary'

function Example() {
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    fetchGreeting(name).then(
      (response) => {
        // Set data in state and re-render
      },
      (error) => {
        // Show error boundary
        showBoundary(error)
      }
    )
  })

  // Render ...
}
```
