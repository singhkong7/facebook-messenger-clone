import React, { useState, useEffect } from "react";
import "./messenger.scss";
import { Button, FormControl,Input,InputLabel } from "@material-ui/core";
import db from "./firebase/firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from '@material-ui/core';
import Message from "./Message";
function Messenger() {
  const [input, setInput] = useState(" ");
  const [messages, setMessages] = useState([]);
  const [username,setUsername]=useState(' ');
  useEffect(()=>
  {
      db.collection('users')
      .orderBy('timestamp','desc')
      .onSnapshot(snapshot=>
    {
        setMessages(snapshot.docs.map(doc=>({id:doc.id,message:doc.data()})))
    });
  },[])
  useEffect(()=>
  {
      setUsername(prompt('please enter your name'))
  },[])
  console.log(input);
  console.log(messages);
  const sendMessage = (event) => {
    event.preventDefault();
    
    db.collection('users').add({
        message:input,
        username:username,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput(" ");
  };
 
  return (
    <div className="Messenger">
      <img  className="img" src="https://www.bing.com/th?id=OIP.dp9u3pkm7xUiTQKq4fuMlAHaDt&w=196&h=98&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt=" "></img>
        <h2>Welcome {username}</h2>
      <form className="Messenger_form">
        <FormControl className="form-control">
          <Input
            className="input"
            type="search"
            placeholder="Type Your Message"
            onChange={(event) => setInput(event.target.value)}
          />
            <IconButton
              disabled={!input}
              variant="contained"
              color="primary"
              className="Messenger_button"
              type="submit"
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
        </FormControl>
      </form>
        <FlipMove>
            {messages.map(({id,message}) => (
                <Message key={id} username={username} message={message} />
            ))}
        </FlipMove>
    </div>
  );
}
export default Messenger;
