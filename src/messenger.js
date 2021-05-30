import React, { useState, useEffect } from "react";
import "./messenger.scss";
import { Button, FormControl,Input,InputLabel } from "@material-ui/core";
import db from "./firebase/firebase";
import firebase from "firebase";
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
        setMessages(snapshot.docs.map(doc=>doc.data()))
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
        <h2>Welcome {username}</h2>
      <FormControl>
        <InputLabel>Enter a Message</InputLabel>
        <Input
          type="search"
          placeholder="Type Your Message"
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
            disabled={!input}
            variant="contained"
            color="primary"
            className="button"
            type="submit"
            onClick={sendMessage}
        >
          Send Message
        </Button>
      </FormControl>
      {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    </div>
  );
}
export default Messenger;
