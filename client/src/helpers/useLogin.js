import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [isUserLoggedin, setIsUserLoggedin] = useState();
    const Navigate = useNavigate();
    const login = (email, password) => {
        const credentials = {
            "email": email,
            "password": password
        }
        axios.post("/login", credentials)
        .then((response) => {
            if(response.data.success){
                setIsUserLoggedin(true);
                console.log(response.data);
                Navigate('/admin')
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