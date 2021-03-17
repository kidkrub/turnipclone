import React, { useState } from "react"
import axios from "axios"

const IndexPage = () => {
  const [status, setStatus] = useState("")

  const onLoginClick = () => {
    axios
      .post(
        "http://localhost:3000/login",
        { email: "abc@a.sdf", password: "password" },
        { withCredentials: true }
      )
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  const onProfileClick = () => {
    axios
      .get("http://localhost:3000/profile", { withCredentials: true })
      .then(result => setStatus(result.data))
  }

  const onLogoutClick = () => {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <section>status = {status}</section>
      <button onClick={onLoginClick}>Login!!!</button>
      <button onClick={onProfileClick}>Get Profile</button>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  )
}

export default IndexPage
