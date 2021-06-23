import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

export const UserProvider = (props) => {
    const [token, setToken] = useState('')
    //const [tokenAuth, setTokenAuth] = useState('')

    
    // const showData = () => {
    //     const auth = axios.create({
    //         baseURL: 'https://movie-search-backend.herokuapp.com',
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     auth.get('/login/isAuth').then(({ data }) => {
    //         setTokenAuth(data.data.username)
    //     })
    // }

    useEffect(() => {
        if (token) {
            localStorage.setItem('userAccessToken', token)
            console.log('context',token)
        }
    }, [token])

    return (
        <UserContext.Provider
            value={
                {
                    token,
                    setToken
                    // ,
                    // showData,
                    // tokenAuth
                }
            }
        >
            {
                props.children
            }
        </UserContext.Provider>
    )
}

export default UserContext