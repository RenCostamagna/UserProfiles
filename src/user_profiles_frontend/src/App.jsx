import { InternetIdentity} from "@connect2ic/core/providers"
import { createClient} from "@connect2ic/core"
import { Connect2ICProvider , ConnectButton, ConnectDialog  } from "@connect2ic/react"
import "@connect2ic/core/style.css"
import * as user_profiles_backend from "declarations/user_profiles_backend"
import { User } from "./components/User"
import React from "react"


function App() {
  return (  
    <div className="min-h-screen">
      <header className="relative flex justify-start items-center p-4 border-b border-gray-600">
        <div className="absolute top-2 right-2">
          <ConnectButton />
        </div>
      </header>
      <ConnectDialog />
      <User />
    </div>
  )
}

const client = createClient({
  canisters: {
    user_profiles_backend,
  },
  providers: [
  new InternetIdentity({providerUrl:"http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai" })
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



