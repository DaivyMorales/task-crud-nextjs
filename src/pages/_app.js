import "../styles/main.css";
import Layout from "../Components/Layout";
import { StateProvider } from "Context/StateContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}
