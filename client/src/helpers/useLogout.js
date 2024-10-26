import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {userLoggedOut } from '../redux/reducers/auth_slice'
import { useDispatch, useSelector } from 'react-redux'

const useLogout = () => {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
 

    const logout = () => {
        axios.get("/logout").then((response) => {
            if(response.data.success){
                Dispatch(userLoggedOut());
                Navigate('/login')
                
            }
        })
    }

    return { logout }
}
export default useLogout