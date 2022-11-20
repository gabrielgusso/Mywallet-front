import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/GlobalStyle.js"
import Login from "./pages/Login.js"
import Registration from "./pages/Registration.js"
import Activites from "./pages/Activites.js"
import Auth from "./providers/auth.js"

function App() {
  const [user, setUser] = useState("")
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Auth.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Registration />} />
          <Route path="/atividades" element={<Activites />} />
        </Routes>
        </Auth.Provider>
    </BrowserRouter>
  )
}

export default App
