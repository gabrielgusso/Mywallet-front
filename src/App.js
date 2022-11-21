import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/GlobalStyle.js"
import Login from "./pages/Login.js"
import Registration from "./pages/Registration.js"
import Activites from "./pages/Activites.js"
import NovaEntrada from "./pages/NovaEntrada.js" 
import NovaSaida from "./pages/NovaSaida.js"
import Auth from "./providers/auth.js"


function App() {
  const [token, setToken] = useState("")
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Auth.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Registration />} />
          <Route path="/atividades" element={<Activites />} />
          <Route path="/nova-saida" element={<NovaSaida />} />
          <Route path="/nova-entrada" element={<NovaEntrada />} />
        </Routes>
        </Auth.Provider>
    </BrowserRouter>
  )
}

export default App
