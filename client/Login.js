import React, { useState } from 'react';
import { Button } from 'react-materialize';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <div>
        <p>Username: ''JenBergeron</p>
        <input onChange = {(e) => setUsername(e.target.value)} placeholder = 'Enter Username' type="text"/>
      </div>
      <div>
        <p>Password: 'walshband1'</p>
        {props.login === '' ? (<></>) : (<div style = {{fontSize: '10px', color: 'red'}}>{props.login}</div>)}
        <input onChange = {(e) => setPassword(e.target.value)} placeholder = 'Enter Password' type="password"/>
      </div>
      <Button onClick = {() => props.loginSubmit(username, password)} waves="light" style={{marginRight: '5px', width: '150px', 'backgroundColor': '#1c4834', color: '#fdcc00'}}>Login</Button>
    </div>
  )
}
