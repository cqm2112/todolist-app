import React, { createContext, useContext, useState } from 'react';



const AuthContext = createContext(undefined);

export const AuthProvider= ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    const contextValue = {
        token,
      
        setToken: (newToken) => {
            setToken(newToken);
            if (newToken) {
                localStorage.setItem('token', newToken);
            } else {
                localStorage.removeItem('token');
            }
        },
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};
