import { Link } from "react-router-dom"
// Icons
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import useLogin from "../../../helpers/useLogin";
import { useSelector } from "react-redux";

const Login = () => {
    const [seePassword, setSeePassword] = useState(false);
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const { login, isUserLoggedin } = useLogin();
    const userLoggedIn = useSelector((state) => state.user_auth);
    return(
        <section className="flex items-center justify-center w-screen h-screen bg-gray-50">
            <form className="relative p-16 bg-white border min-h-96 min-w-96"
                onSubmit={(e) => {
                    e.preventDefault();
                    login(credentials.username, credentials.password);
                }}
            >
                <div className="flex justify-center mb-10 text-2xl">MAHAKAYA</div>
                <div className="flex justify-center my-10 text-2xl font-semibold">Login</div>

                <div className="grid gap-4">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" required type="text" 
                            onChange={(e) => setCredentials((credentials) => ({...credentials, username: e.target.value}))} 
                            className="mt-2 border primary-input focus:border-purple-600" placeholder="Enter Your Username" 
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password">Password</label>
                        <input id="password" required type={seePassword ? 'text' : 'password'}
                            onChange={(e) => setCredentials((credentials) => ({...credentials, password: e.target.value}))}
                            className="mt-2 border primary-input focus:border-purple-600" placeholder="Enter Your Password" 
                        />
                        <span onClick={() => setSeePassword(!seePassword)} className="absolute inline-block cursor-pointer right-5 top-12"> 
                            {
                                seePassword
                                ? <GoEye size={'18px'} /> 
                                : <GoEyeClosed size={'18px'} />
                            }
                        </span>
                    </div>

                    <div className="text-right select-none"><Link>Forget Password?</Link></div>


                    <button className="w-full mt-4 p-3.5 rounded-full bg-blue-800 text-white">Login</button>
                </div>
                
                
                <div className={`w-full flex justify-center absolute -bottom-5 left-0 ${isUserLoggedin == false ? 'alert-animation' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 p-2 bg-white border rounded-full shadow-lg min-w-4/5 shadow-gray-200">
                        <MdOutlineError size={'18px'} color="#352A7A" />
                        <span className="pr-2 text-sm text-red-500">Invalid <strong>Username</strong> or <strong>Password</strong></span>
                    </div>
                </div>
            </form>
        </section>
    )
}
export default Login