import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';


export const AuthContext = createContext(null);



const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState({
        id: 1,
        name: 'John Doe',
        role: 'admin', // roles can be 'admin', 'agent', 'customer'
    });

    const authInfo = {
        isAuthenticated,
        user,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider