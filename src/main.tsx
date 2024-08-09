import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

import './demos/ipc'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const theme = extendTheme({
  components: {
    Steps
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
