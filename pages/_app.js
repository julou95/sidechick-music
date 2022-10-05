import '../styles/globals.css'
import useOneSignal from '@/constants/useOneSignal'

function MyApp({ Component, pageProps }) {
  useOneSignal()

  return <Component {...pageProps} />
}

export default MyApp
