import React from 'react'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import RoutesContainer from './components/RoutesContainer';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: '#3498db' },
      secondary: { main: '#1976d2' },
      yellow: { main: '#F5C469' },
      gray: { main: '#382F2D' },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <RoutesContainer />

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  )
}

export default App
