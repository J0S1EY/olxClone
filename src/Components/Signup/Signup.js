import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FireBaseContext } from '../../contexts/Context';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



export default function Signup() {
  const { fireBase,auth } = useContext(FireBaseContext)
  const history = useHistory()
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    // const auth = getAuth();
    e.preventDefault();

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(response => {
        const user = response.user;
        return updateProfile(user, {
          displayName: formData.userName
        })
          .then(() => {
            return addDoc(collection(fireBase, 'userCredentials'), {
              id: user.uid,
              userName: formData.userName,
              phone: formData.phone
            });
          });
      })
      .then(() => {
        alert("Signup Successful");
        history.push("/login");
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        // Handle errors appropriately, e.g., display an error message to the user
        alert(`Signup failed: ${errorMessage}`);
        history.push("/signUp");
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="userName"
            name="userName"
            defaultValue="John"
            value={formData.userName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue="John"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            defaultValue="Doe"
            value={formData.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            defaultValue="Doe"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a >Login</a>
      </div>
    </div>
  );
}
