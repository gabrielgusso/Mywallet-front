import styled from "styled-components"
import { purple, lightPurple } from "../constants/colors"
import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/url"
import { useNavigate } from "react-router-dom"

export default function NovaSaida() {
  const navigate = useNavigate()
  const [registry, setRegistry] = useState({ type: "exit" })
  const token = localStorage.getItem("bearer")  

  useEffect(() => { 
    if (token) {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      const request = axios.get(`${BASE_URL}/activity`, config)
      request.then((res) => {})
      request.catch(() => {
        sessionStorage.removeItem("bearer")
        navigate("/")
      })
    } else {
      navigate("/")
    }
  }, [])

  function register(event) {
    event.preventDefault()
    const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    console.log(registry)
    const request = axios.post(`${BASE_URL}/activity`, registry ,config)
      request.then((res) => {
        navigate("/atividades")
      })
      request.catch((err) => {
        if(err.response.status === 422){
            alert(err.response.data)
        }
        console.log(err)
      })
  }

  return (
    <Container>
      <Header>
        <p>Nova saida</p>
      </Header>
      <form onSubmit={register}>
        <input
          data-identifier="input-email"
          placeholder="Valor"
          type="number"
          required
          onChange={(e) => setRegistry({ ...registry, value: e.target.value })}
        />
        <input
          data-identifier="input-password"
          placeholder="Descrição"
          type="text"
          required
          onChange={(e) =>
            setRegistry({ ...registry, description: e.target.value })
          }
        />
        <button type="submit" data-identifier="login-btn">
          salvar saida
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  background-color: ${purple};
  padding: 25px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 100%;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-weight: 400;
    font-size: 19.976px;
    margin-bottom: 10px;
    outline: none;
    background-color: "#ffffff";
    padding-left: 11px;
  }
  input::placeholder {
    color: "#dbdbdb";
  }
  button {
    width: 100%;
    height: 45px;
    background: ${lightPurple};
    border-radius: 4.63636px;
    border: none;
    font-weight: 700;
    font-size: 20.976px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  p {
    font-weight: 700;
    font-size: 26px;
    color: white;
  }
`
