import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
function Header() {
  const { user, setUser } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  const Navigate = useNavigate()
  const toLogin = () => {
    Navigate('/login');
  };
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        Navigate('/login')
      })
      .catch((error) => {
        console.error("Logout Error: ", error);
      });
  };
  const toCreate =()=>{
    Navigate('/create')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? `Welcome ${user.displayName}` : <span onClick={toLogin}>Login</span>}
          <hr />
        </div>
        {user && <span onClick={handleLogout}>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={toCreate}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
