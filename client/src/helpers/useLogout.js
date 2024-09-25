import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userLoggedIn, userLoggedOut } from '../redux/reducers/auth_slice'
import { useDispatch, useSelector } from 'react-redux'

const useLogout = () => {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const userStatus = useSelector((state) => state.user_auth.logged_in)

    const logout = () => {
        axios.get("/logout").then((response) => {
            Dispatch(userLoggedOut());
            if(response.data.success){
                Navigate('/login')
                // Dispatch(userLoggedIn({status: false, access: "super_admin"}));
                // console.log(userStatus);
            }
        })
    }

    return { logout }
}
export default useLogout