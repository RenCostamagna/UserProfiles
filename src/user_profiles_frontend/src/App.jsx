import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { createClient } from "@connect2ic/core"
import { Connect2ICProvider , ConnectButton, ConnectDialog  } from "@connect2ic/react"
import "@connect2ic/core/style.css"
import { Actor, HttpAgent } from '@dfinity/agent';
import * as user_profiles_backend from "declarations/user_profiles_backend"
import React from "react"


import { Home } from "./components/Home"


function App() {
  
  return (
    <div className="App">
      <div>
      <header className="app-header" > 
        <h1 className="app-title" >User Profiles</h1>
      </header>        
            <div className="auth-section">
              <ConnectButton />
            </div>
          <ConnectDialog />
      </div>
      <header className="App-header">
        
        <Home/>

      </header>
    </div>
  );
};

const client = createClient({
  canisters: {
    user_profiles_backend,
  },
  providers: [
  new InternetIdentity({providerUrl:"http://127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai" })
  ],
  globalProviderConfig: {
    dev: true,
  }
})

export default () => ( 
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)



