import React from 'react';

const AuthContext = React.createContext({
    token : null,
    userId : null,
    login : (token , userId , expirationTime) => {},
    logout : () =>{}
})

export default AuthContext;