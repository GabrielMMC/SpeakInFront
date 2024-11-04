import React from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home";
import Room from "./Room";
import RoomBackup from "./RoomBackup";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

//Props comming from App.js file
const RoutesContainer = () => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("speakInUser");
  user = user && JSON.parse(user);

  React.useEffect(() => {
    if (!token) {
      return
    }

    window.Pusher = Pusher;
    window.finishGesture = false;

    dispatch({
      type: 'echo', payload:
        new Echo({
          broadcaster: 'pusher',
          key: '991347938583a49bf08a',
          cluster: 'sa1',
          wsHost: 'localhost',
          authEndpoint: 'http://localhost:8000/broadcasting/auth', // Rota para autenticação do broadcasting
          auth: {
            headers: {
              Authorization: `Bearer ${token}`, // Seu token de autenticação (caso necessário)
            },
          },
          wsPort: 6001,
          transports: ['websocket'],
          enabledTransports: ['ws'],
          forceTLS: false,
          disableStats: true,
          encrypted: false,
        })
    })

  }, [token])
  // console.log('user', user)

  const userRedux = useSelector(state => state.AppReducer.user)

  if (userRedux?.id !== user?.id) {
    dispatch({ type: "login", payload: { token: token, user: user } });
  }

  return (
    <Routes>
      <Route path={"/*"} element={<Room />} />
    </Routes>
  );
};

export default RoutesContainer;
