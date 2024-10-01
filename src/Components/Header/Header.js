import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/Context';
import { auth } from '../../fireBase/config';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase

function Header() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const handleLoginClick = (path) => {
    history.push(path)
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        console.error("Sign out error: ", error);
      });
  };
  const addProduct=()=>{
    user ? handleLoginClick("/addproduct") : alert("Please login")
    handleLoginClick("/login")
  }



  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => handleLoginClick("/")} className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div
          className="loginPage"
          onClick={() => handleLoginClick("/login")} // Pass a function reference here
          style={{ cursor: 'pointer' }}
        >
          <span>{user ? `Welcome ${user.displayName}` : "Login"}</span>
          <hr />
        </div>
        <div>
          {user && (
            <span style={{ cursor: 'pointer' }} onClick={handleLogout}>
              Logout
            </span>
          )}
        </div>
        <div className="sellMenu">
          <SellButton />
          <div
            onClick={addProduct} // Pass a function reference here
            className="sellMenuContent"
          >
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

