import React from 'react';
import ReactDOM from 'react-dom/client'; // Replace 'react-dom' with 'react-dom/client'
import App from './App';
import { FirebaseContext } from './store/Context';
import Context from './store/Context';
import { firebaseApp, auth, db, storage } from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <FirebaseContext.Provider value={{ firebaseApp, auth, db, storage }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
