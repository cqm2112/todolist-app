import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token') || null
    );

    const contextValue: AuthContextType = {
        token,
        setToken: (newToken: string | null) => {
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

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};
