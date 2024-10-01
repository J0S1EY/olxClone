import React, { useEffect, useContext } from 'react';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './contexts/Context';
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Auth listener
import { auth } from './fireBase/config'; // Import the auth instance
import AddProduct from './Components/Create/Create'
import ViewProduct from './Components/View/View'
import Posts from './contexts/PostsContext';
function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state on auth change
    });
  })

  return (
    <div>
      <Posts>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signUp">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/addproduct">
            <AddProduct />
          </Route>
          <Route path="/viewproduct">
            <ViewProduct />
          </Route>
        </Router>
      </Posts>
    </div>
  );
}

export default App;
