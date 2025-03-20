import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import './App.css';
import { AuthContext, FirebaseContext } from './store/Context';
import Home from './Pages/Home';
import { onAuthStateChanged } from 'firebase/auth';
import Post from './store/PostContext'

function App() {
  const {setUser} = useContext(AuthContext);
  const {auth} = useContext(FirebaseContext)
  useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth,(user)=>{
    setUser(user||null)
  });
  return () => unsubscribe();
  },[auth,setUser]);

  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
