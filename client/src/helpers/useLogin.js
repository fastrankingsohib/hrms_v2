import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../redux/reducers/auth_slice";
import useSidebarAuth from "./useSidebarLink";

const useLogin = () => {
    const [isUserLoggedin, setIsUserLoggedin] = useState();
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState(false)

    const { ValidateSidebar } = useSidebarAuth();
    const dispatch = useDispatch();

    const Navigate = useNavigate();
    const login = (username, password) => {
        const credentials = {
            "username": username,
            "password": password
        }
        setLoginLoading(true);
        axios.post("/login", credentials)
            .then((response) => {
                if (response.data.success) {
                    setIsUserLoggedin(true);
                    setLoginError(false);
                    setLoginLoading(false);

                    Navigate('/');
                    
                    dispatch(
                        userLoggedIn(
                            {
                                status: true,
                                access: "admin",
                                username: response.data.user.username,
                                data: response.data
                            }
                        )
                    )
                    ValidateSidebar()
                }
            })
            .catch((err) => {
                setLoginError(true)
                setIsUserLoggedin(false);
                setLoginLoading(false)
                if (err.status == '401') {
                    setTimeout(() => {
                        setIsUserLoggedin(null)
                    }, 2900)
                }
            });
    }


    return { login, isUserLoggedin, loginLoading, loginError }
}

export default useLogin;