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
import ProtectedRoute from '../components/ProtectedRoute';

const protectedRoutes = ['/admin/dashboard', '/user/history'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const ProtectedRoutes = () => {
    if (protectedRoutes.includes(router.pathname)) return (<ProtectedRoute><Component {...pageProps} /></ProtectedRoute>)
    return <Component {...pageProps} />
  };

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
