import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode';
import {useRouter} from 'vue-router';
export const useStore = defineStore('store', () => {
    const router = useRouter()
    const isTokenValid = () => {
      const token = localStorage.getItem('token')
      if (!token) return false
      try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000
    
        if (decoded.exp > now) {
          return true
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
          return false
        }
      } catch (err) {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
        console.log(err)
      }
    }

    const autoLogOut = () =>{
      const token = localStorage.getItem('token')
      if(!token) return
      const { exp } = jwtDecode(token)
      const timeUntilLogout = exp * 1000 - Date.now()
      setTimeout(() => {
        localStorage.removeItem('token')
      }, timeUntilLogout)
    }

    const logOut = ()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
      router.push({name: "AuthLayout"})
    }
    return { isTokenValid, autoLogOut, logOut }
  },
  {
    persist: true,
  },
)