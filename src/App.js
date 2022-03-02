import {GlobalProvider} from "./provider/GlobalProvider";
import AppRouter from "./router/Router";
import {Helmet, HelmetProvider } from "react-helmet-async";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

export default function App() {
  
  function getLibrary(provider) {
    return new Web3(provider)
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <GlobalProvider>
            <HelmetProvider>
                <Helmet>
                    <title>DividendTracer</title>
                </Helmet>
                <AppRouter />
            </HelmetProvider>
        </GlobalProvider>          
    </Web3ReactProvider>
  );
}


