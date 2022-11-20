import styled from "styled-components"
import { purple, lightPurple } from "../constants/colors"
import { useContext, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/url"
import { Link, useNavigate } from "react-router-dom"
import Auth from "../providers/auth"
import { ThreeDots } from "react-loader-spinner"
import logo from "../assets/images/MyWallet.png"

export default function Login() {
  const [registry, setRegistry] = useState()
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(Auth)
  const navigate = useNavigate()

  function register(event) {
    event.preventDefault()
    setLoading(true)
    const request = axios.post(`${BASE_URL}/sign-in`, registry)
    request.then((res) => {
      setUser(res.data)
      navigate(`/atividades`)
    })
    request.catch((err) => {
      setLoading(false)
      if (err.response.status === 422) {
        alert(err.response.data)
      }
      if (err.response.status === 409) {
        alert(err.response.data)
      }
      if (err.response.status === 401) {
        alert(err.response.data)
      }
      console.log(err)
    })
  }

  return (
    <Container>
        <img src={logo} alt="logo" />
      <form onSubmit={register}>
        <input
        data-identifier="input-email"
          placeholder="email"
          type="email"
          required
          disabled={loading}         
          onChange={(e) => setRegistry({ ...registry, email: e.target.value })}
        />
        <input
        data-identifier="input-password"
          placeholder="senha"
          type="password"
          required
          disabled={loading}
          onChange={(e) =>
            setRegistry({ ...registry, password: e.target.value })
          }
        />
        <button type="submit" data-identifier="login-btn">
          {loading ? <ThreeDots color="white" height="10px"/> : "Entrar"}
          </button>
      </form>
      <Link to={`/cadastro`}>
        <p data-identifier="sign-up-action">Não tem uma conta? Cadastre-se!</p>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${purple};
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-weight: 400;
    font-size: 19.976px;
    margin-bottom: 6px;
    outline: none;
    background-color:'#ffffff';
    padding-left: 11px;
  }
  input::placeholder {
    color: '#dbdbdb';
  }
  button {
    width: 303px;
    height: 45px;
    background: ${lightPurple};
    border-radius: 4.63636px;
    border: none;
    font-weight: 400;
    font-size: 20.976px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    margin-bottom: 40px;
  }
  p {
    font-weight: 700;
    font-size: 13.976px;
    color: white;
    margin-top: 25px;
    text-decoration: none;
  }
`