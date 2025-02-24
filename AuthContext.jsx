// ***********************************111111111*****************************

import { createContext, useEffect, useState } from "react"


//2

export const AuthContext=createContext()

//3




const AuthContextProvider = ({children}) => {

const [token ,setToken]=useState(null)

console.log(token);


useEffect(function(){
if(localStorage.getItem("tkn")!=null)
    setToken(localStorage.getItem("tkn"))
},[])


  return (
   <AuthContext.Provider value={
    {
        token,
        setToken,}
   }>
      {children}
      </AuthContext.Provider>
  )
}

export default AuthContextProvider
