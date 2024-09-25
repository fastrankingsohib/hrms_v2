import { Link } from "react-router-dom"
// Icons
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import useLogin from "../../../helpers/useLogin";
import { useSelector } from "react-redux";

const Login = () => {
    const [seePassword, setSeePassword] = useState(false);
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const { login, isUserLoggedin } = useLogin();
    const userLoggedIn = useSelector((state) => state.user_auth);
    return(
        <section className="h-screen w-screen flex justify-center items-center bg-gray-50">
            <form className="relative min-h-96 min-w-96 bg-white border p-16"
                onSubmit={(e) => {
                    e.preventDefault();
                    login(credentials.username, credentials.password);
                }}
            >
                <div className="flex justify-center mb-10 text-2xl">MAHAKAYA</div>
                <div className="flex justify-center my-10 text-2xl font-semibold">Login</div>

                <div className="grid gap-4">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" required type="text" 
                            onChange={(e) => setCredentials((credentials) => ({...credentials, username: e.target.value}))} 
                            className="primary-input border focus:border-purple-600 mt-2" placeholder="Enter Your Email" 
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password">Password</label>
                        <input id="password" required type={seePassword ? 'text' : 'password'}
                            onChange={(e) => setCredentials((credentials) => ({...credentials, password: e.target.value}))}
                            className="primary-input border focus:border-purple-600 mt-2" placeholder="Enter Your Password" 
                        />
                        <span onClick={() => setSeePassword(!seePassword)} className="inline-block absolute right-5 top-12 cursor-pointer">
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
                    <div className="min-w-4/5 bg-white flex items-center gap-2 rounded-full border p-2 shadow-lg shadow-gray-200">
                        <MdOutlineError size={'18px'} color="#352A7A" />
                        <span className="text-red-500 text-sm pr-2">Invalid Details. Please check the Email ID - Password</span>
                    </div>
                </div>
            </form>
        </section>
    )
}
export default Login