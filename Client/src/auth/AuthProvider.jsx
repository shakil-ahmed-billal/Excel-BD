/* eslint-disable react-refresh/only-export-components */
import { loginUser, registerUser } from '@/utils/auth'
import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    // User registration function
    const userRegister = async (data) => {
        try {
            const response = await registerUser(data)

            if (response.success) {
                // Store token and user data 
                Cookies.set('token', response.token, { expires: 7 })
                Cookies.set('user', JSON.stringify(response.user), { expires: 7 })

                setUser(response.user)
                setToken(response.token)
                setLoading(false)

                return response
            } else {
                return { success: false, message: response.message }
            }
        } catch (error) {
            console.error('Registration failed:', error.message)
            return { success: false, message: error.message }
        }
    }

    const userLogin = async (data) => {
        try {
            const response = await loginUser(data)

            if (response.success) {
                // Store token and user data 
                Cookies.set('token', response.token, { expires: 7 })
                Cookies.set('user', JSON.stringify(response.user), { expires: 7 })

                setUser(response.user)
                setToken(response.token)
                setLoading(false)
                return response
            } else {
                return { success: false, message: response.response.data.message}
            }

        } catch (error) {
            console.log("User Login Fail", error);
            return { success: false, message: error.response.data.message}
        }
    }

    // Logout function
    const userLogOut = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        setUser(null)
        setToken(null)
        setLoading(false)

    }

    // Check for user token and user data on first render
    useEffect(() => {
        const userToken = Cookies.get('token')
        const savedUser = Cookies.get('user')

        if (userToken && savedUser) {
            setUser(JSON.parse(savedUser))
            setToken(userToken)
   
        }

        setLoading(false)
    }, [])

    const authInfo = {
        user,
        token,
        loading,
        userRegister,
        userLogOut,
        userLogin,
   
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider