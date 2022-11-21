import styled from "styled-components"
import { purple, lightPurple } from "../constants/colors"
import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/url"
import { useNavigate } from "react-router-dom"
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io"
import { IoExitOutline } from "react-icons/io5"

export default function Activites() {
  const navigate = useNavigate()
  const [activitesResponse, setActivitesResponse] = useState()
  const [balanceResponce, setBalanceResponce] = useState("0")
  const [user, setUser] = useState()

  useEffect(() => {
    const token = localStorage.getItem("bearer")
    if (token) {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      const request = axios.get(`${BASE_URL}/activity`, config)
      request.then((res) => {
        setActivitesResponse(res.data)
      })
      request.catch(() => {
        sessionStorage.removeItem("bearer")
        navigate("/")
      })
      const request1 = axios.get(`${BASE_URL}/balance`, config)
      request1.then((res) => {
        setUser(res.data.user)
        setBalanceResponce(res.data)
      })
      request1.catch(() => {
        sessionStorage.removeItem("bearer")
        navigate("/")
      })
      
    } else {
      navigate("/")
    }
  }, [])

  return (
    <Container>
      <Header>
        <p>Ola, {user && user.username}</p>
        <Exit onClick={() => {
            sessionStorage.removeItem("bearer")
            navigate("/")
        }}/>
      </Header>
      <ActivitesBox>
        {activitesResponse ? 
        activitesResponse.map((e) => 
           <div key={e._id}>
            <div> <h1>{e.date}</h1>
           <p>{e.description}</p></div>      
           <Value color={e.type === "entry" ? "#03AC00" : "#C70000"}>{e.value}</Value>
           </div>          
        )
        : <p>nada</p>}
      </ActivitesBox>
      <Balance color={balanceResponce.balance > 0 ? "#03AC00" : "#C70000"}><h3>Saldo</h3><p>{balanceResponce.balance}</p></Balance>
      <Buttons>
        <button
          onClick={() => {
            navigate("/nova-entrada")
          }}
        >
          <Add />
          Nova
          <br /> entrada
        </button>
        <button
          onClick={() => {
            navigate("/nova-saida")
          }}
        >
          <Remove />
          Nova
          <br /> saida
        </button>
      </Buttons>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  background-color: ${purple};
  padding: 25px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  p {
    font-weight: 700;
    font-size: 26px;
    color: white;
  }

`
const ActivitesBox = styled.div`
  background-color: white;
  width: 100%;
  height: 65%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 16px;
  overflow-y: scroll;
  padding: 20px 10px 0px 10px;
  div{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  p{
    margin-left: 10px;
  }
  h1{
    color: #C6C6C6;
    font-weight: 400;
  }
`
const Value = styled.h2`
font-weight: 400;
color: ${(props) => props.color};
`

const Balance = styled.span`
margin-bottom: 13px;
background-color: white;
width: 100%;
height: 30px;
display: flex;
padding: 0 10px 0 10px;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
align-items: center;
justify-content: space-between;
p {
  color: ${(props) => props.color}
}
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20%;
  button {
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    width: 49%;
    height: 100%;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    background-color: ${lightPurple};
  }
`
const Remove = styled(IoMdRemoveCircleOutline)`
  font-size: 22px;
`
const Add = styled(IoMdAddCircleOutline)`
  font-size: 22px;
`
const Exit = styled(IoExitOutline)`
  font-size: 25px;
  color: white;
`
