import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../redux/reducers/auth_slice";

const useLogin = () => {
    const [isUserLoggedin, setIsUserLoggedin] = useState();
    const dispatch = useDispatch();

    const Navigate = useNavigate();
    const login = (username, password) => {
        const credentials = {
            "username": username,
            "password": password
        }
        axios.post("/login", credentials)
        .then((response) => {
            if(response.data.success){
                console.log(response.data);
                setIsUserLoggedin(true);
                Navigate('/post-new-job');
                
                dispatch(
                    userLoggedIn(
                        {
                            status: true, 
                            access: "admin",
                            username: response.data.user.username
                        }
                    )
                )
            }
        })
        .catch((err) => {
            console.log(`Error is: ${err.status}`);
            if(err.status == '401'){
                setIsUserLoggedin(false);
                setTimeout(() => {
                    setIsUserLoggedin(null)
                }, 2900)
            }
        });
    }


    return { login, isUserLoggedin }
}

export default useLogin;