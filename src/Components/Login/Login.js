import React from 'react';
import { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const history = useHistory();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const handleLoginClick = () => {
    history.push('/signUp');
  }



  // const handleChange = (e)=>{
  //   const data=e.target.value;
  //   // console.log(data)
  // }

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth(); // Correctly get the auth instance
    signInWithEmailAndPassword(auth, userName, password)
      .then((response) => {
        console.log('Login successful:', response);
        history.push('/'); // Navigate to the homepage or any other route
      })
      .catch((err) => {
        console.log('Login error:', err);
        alert(err)
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue="John"
            // value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            defaultValue="password"
            // value={pasword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button >Login</button>
        </form>
        <a onClick={handleLoginClick} style={{ cursor: 'pointer' }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
