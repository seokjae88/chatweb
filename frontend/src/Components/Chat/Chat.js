import React, { useState, useEffect } from "react";
import queryString from "query-string";
import SockJS from 'sockjs-client';
import StompJs from 'stompjs';
import InfoBar from "../Infobar/Infobar";
import Input from "../Input/Input";
import "./Chat.css";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer"

let stomp = null;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    var sockJs = new SockJS("/ws");
    //1. SockJS를 내부에 들고있는 stomp를 내어줌
    stomp = StompJs.over(sockJs);

    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name);

    stomp.connect({}, function() {
      console.log("STOMP Connection");

      //4. subscribe(path, callback)으로 메세지를 받을 수 있음
      stomp.subscribe("/sub/chat/room/" + room, function (chat) {
        var content = JSON.parse(chat.body);

        var writer = content.writer;
        var msg = content.message;
        
        console.log(writer + " / " + msg);
        setUser(writer);
        //setMessage(msg);
        setMessages(messages => [...messages, msg]);
      });

      stomp.subscribe("/sub/chat/room/" + room + "/user", function (chat) {
        var content = JSON.parse(chat.body);

        var writer = content.writer;        
        var msg = content.message;

        setUsers(users => [...users, writer]);
        setUser(writer);
        setMessages(messages => [...messages, msg]);
      });

      //3. send(path, header, message)로 메세지를 보낼 수 있음
      stomp.send('/pub/chat/enter', {}, JSON.stringify({roomId: room, writer: name}))

    });

    return () => {
      // socket.emit("disconnect");
      // socket.off();
    };
  }, [location.search]);
  
  useEffect(() => {
  }, [messages]);


  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  // useEffect(() => {
  //   socket.on("roomData", ({users}) =>{
  //     setUsers(users)
  //   });
  // },[])

  function sendMessage(event) {
    event.preventDefault();
    if (message) {
      console.log("send message!!");
      stomp.send('/pub/chat/message', {}, JSON.stringify({roomId: room, message: message, writer: name}));
      //setMessages([...messages, message]);
      setMessage("");
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} user={user} name={name}/>
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        ></Input>
      </div>
      <TextContainer users = {users} />

    </div>
  );
}

export default Chat;
