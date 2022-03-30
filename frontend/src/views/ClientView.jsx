/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react'
import '../App.css'
import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import UserInput from '../components/UserInput/UserInput'
import Chat from '../components/Chat/Chat'
import Drawer from '../components/Drawer/Drawer'
import SwitchRoleButton from '../components/temp/SwitchRoleButton/SwitchRoleButton'
import { SocketContext } from '../context/socket'

function ClientView() {
  const socket = useContext(SocketContext)
  const [isLogged, setIsLogged] = useState(false)
  const [isChallenged, setIsChallenged] = useState(false)

  const [user, setUser] = useState({})

  const [words, setWords] = useState([])

  const handleUpdateDrawer = (data) => {
    setWords(data)
    setIsChallenged(true)
  }

  const handleRetrieveUser = (oldUser) => {
    const newUser = { ...user, pseudo: oldUser.pseudo, avatar: oldUser.avatar }
    setUser(newUser)
  }

  useEffect(() => {
    socket.on('update-drawer', handleUpdateDrawer)
    socket.on('retrieve-user', handleRetrieveUser)

    return () => {
      socket.off('update-drawer', handleUpdateDrawer)
    }
  }, [socket])

  return (
    <>
      {!isChallenged && <Header styles="in-column" />}
      {
        isLogged
          ? (
            <>
              <Chat />
              <SwitchRoleButton
                isChallenged={isChallenged}
                setIsChallenged={setIsChallenged}
                setWords={setWords}
              />
              {isChallenged
                ? <Drawer setIsChallenged={setIsChallenged} words={words} />
                : <UserInput />}
            </>
          )
          : <Login setIsLogged={setIsLogged} />
      }
    </>
  )
}
export default ClientView
