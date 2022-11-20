import styled from "styled-components"
import { purple, lightPurple } from "../constants/colors"
import { useContext, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/url"
import { Link, useNavigate } from "react-router-dom"
import Auth from "../providers/auth"
import { ThreeDots } from "react-loader-spinner"
import logo from "../assets/images/MyWallet.png"
import {IoMdAddCircleOutline, IoMdRemoveCircleOutline} from "react-icons/io"

export default function Activites() {
  return (
    <Container>
      <Header>
        <p>Ola, Fulano</p>
      </Header>
      <ActivitesBox></ActivitesBox>
      <Buttons>
        <button><Add/>Nova<br/> entrada</button>
        <button><Remove/>Nova<br/> saida</button>
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
  p {
    font-weight: 700;
    font-size: 26px;
    color: white;
    margin-bottom: 25px;
  }
`
const ActivitesBox = styled.div`
  background-color: white;
  width: 100%;
  height: 70%;
  border-radius: 5px;
  margin-bottom: 13px;
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
const Remove = styled(IoMdAddCircleOutline)`
font-size: 22px;
`
const Add = styled(IoMdAddCircleOutline)`
font-size: 22px;
`