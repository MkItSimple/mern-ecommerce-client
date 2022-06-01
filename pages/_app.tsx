import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalStyles } from '../components/styles/GlobalStyles';
import { AppContextProvider } from '../states/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/stripe.css";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/router';
import NProgress from 'nprogress'
import '../public/nprogress.css'
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect } from 'react';


const protectedRoutes = ['/admin/dashboard', '/user/history'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const ProtectedRoutes = () => {
    if (protectedRoutes.includes(router.pathname)) return (<ProtectedRoute><Component {...pageProps} /></ProtectedRoute>)
    return <Component {...pageProps} />
  };

  useEffect(() => {
    const handleStart = (url: string) => {
      // console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  

  return (
    <>
      <GlobalStyles />
      <ToastContainer className="toast" />
      <AppContextProvider>
          <DndProvider backend={HTML5Backend}>
            {ProtectedRoutes()}
          </DndProvider>
      </AppContextProvider>
    </>
  )
}

export default MyApp
