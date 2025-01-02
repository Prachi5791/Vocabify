import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';  // Make sure you're importing jwt-decode

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null); 
    const [motherTongue, setMotherTongue] = useState(null)

    // console.log(`userId: ${userId}`);
    //  console.log(`motherTongue: ${motherTongue}`);
    
    
    // Function to set userId (for example, after logging in)
    const loginUser = (id, motherTongue) => {
        setUserId(id); 
        setMotherTongue(motherTongue);
        localStorage.setItem('token', id);
    };

    const logoutUser = () => {
        setUserId(null);
        setMotherTongue(null);
        localStorage.removeItem('token');  // Remove the token from localStorage
    };

    // On component mount, check if there is a token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        //console.log(`user Token: ${token}`);
        
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                //console.log("Decoded Token:", JSON.stringify(decodedToken, null, 2));
                
                setUserId(decodedToken.userId);
                setMotherTongue(decodedToken.motherTongue)
            } catch (error) {
                console.error("Invalid token:", error);
                setUserId(null);
                 setMotherTongue(null);
            }
        }
    }, []);  // Run only once on component mount

    const isAuthenticated = userId !== null;

    const contextValue = {
        userId, 
        motherTongue,
        loginUser,
        logoutUser,
        isAuthenticated
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
