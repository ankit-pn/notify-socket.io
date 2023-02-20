import './App.css';
import { useState, useEffect } from 'react';

import io from 'socket.io-client'
import { nanoid } from 'nanoid';
const socket = io.connect("http://localhost:5000");

const userName = nanoid(4);

function App() {
  const [msg, setMsg] = useState('');
  const [chat,setChat] = useState([]);
  const sendChat = (e) =>{
    e.preventDefault()
    socket.emit('notification',{msg,userName});
    setMsg("");
  }
  useEffect(()=>{
    socket.on("notification",(payload)=>{
        setChat([...chat,payload])
    })
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>Notify</h1>
        {chat.map((payload,index)=>{
          return <p key ={index}>{payload.msg}:<span>id:{payload.userName}</span></p>
        })}
        <form onSubmit={sendChat}>
          <input type='text' name='chat' placeholder='send text' value = {msg} onChange={(e)=>{
            setMsg(e.target.value)
          }}
          />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
