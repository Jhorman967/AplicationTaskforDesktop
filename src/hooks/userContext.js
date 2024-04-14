 import React, {createContext,useState,useContext} from "react";

 const UserContext = createContext();


 export const UserProvider = ({children}) => {
    const [username, setUsername] = useState('');
    const [userid, setUserId] = useState('');
    


    return (
        <UserContext.Provider value={{username,setUsername, userid, setUserId}}>
        {children}
        </UserContext.Provider>
    )
 }

 export const UseUser = ()=> {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser debe ser usado dentro de un UserProvider')
    }
    return context
 };