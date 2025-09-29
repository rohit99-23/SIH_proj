import '../styles/globals.css';
import '../styles/login.module.css'; // optional: keep module import if used directly by pages

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}