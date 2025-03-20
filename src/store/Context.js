import { createContext, useState } from "react"; 
import { auth, storage, db } from '../firebase/config'; // Ensure 'db' is imported from config

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [user, setUser] = useState(null); 

  return (
    <FirebaseContext.Provider value={{ auth, storage, db }}> {/* Pass db here */}
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
}
