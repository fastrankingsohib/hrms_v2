import { Link } from "react-router-dom"
// Icons
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import useLogin from "../../../helpers/useLogin";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LoginLeftAsset from "../../../assets/login-left-asset.png"
import Logo from "../../../assets/mahakaya.png"
import LoginBg from "../../../assets/login-bg.png"

const Login = () => {
    const [seePassword, setSeePassword] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login, isUserLoggedin, loginLoading, loginError } = useLogin();
    const userLoggedIn = useSelector((state) => state.user_auth);
    return (
        <section className="h-screen w-screen flex justify-center items-center bg-opacity-10" style={{backgroundImage: `url(${LoginBg})`}}>
            <div className="flex gap-4 items-center p-8 rounded-xl border border-[#e8e4ff] bg-white">
                <div className="relative">
                    <h1 className="absolute p-10 text-white left-0 top-0 text-center text-3xl font-bold">Welcome to MAHAKAYA <br /> HR Portal</h1>
                    <img src={LoginLeftAsset} width={"395px"} alt="" />
                </div>
                <form className="relative min-h-96 min-w-96 bg-white rounded-xl p-16"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login(credentials.username, credentials.password);
                    }}
                >
                    <div className="flex justify-center mb-10 text-2xl"><img src={Logo} width={"150px"} /></div>
                    <div className="flex justify-center my-10 text-3xl font-bold">Login</div>

                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="username">Username</label>
                            <input id="username" required type="text"
                                onChange={(e) => {
                                    // setCredentials((credentials) => ({...credentials, username: e.target.value}));
                                    const value = e.target.value;
                                    // Capitalize the first letter and keep the rest unchanged
                                    const capitalizedUsername = value.charAt(0).toUpperCase() + value.slice(1);
                                    setCredentials((values) => ({ ...values, username: capitalizedUsername }));
                                }}
                                value={credentials.username}
                                className="primary-input border focus:border-purple-600 mt-2" placeholder="Enter Your Username"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password">Password</label>
                            <input id="password" required type={seePassword ? 'text' : 'password'}
                                onChange={(e) => setCredentials((credentials) => ({ ...credentials, password: e.target.value }))}
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


                        <button className={`relative w-full mt-4 p-3.5 rounded-full bg-[#352A7A] text-white flex items-center gap-4 justify-center ${loginLoading ? "bg-opacity-60 cursor-not-allowed" : ""}`} disabled={loginLoading}>
                            <span className="absolute left-[35%] top-[30%]">{loginLoading ? <span className="reload-rounding inline-block"><AiOutlineLoading3Quarters /></span> : ""}</span>
                            <span>Login</span>
                        </button>
                    </div>


                    <div className={`w-full flex justify-center absolute -bottom-5 left-0 ${isUserLoggedin == false ? 'alert-animation' : 'opacity-0'}`}>
                        <div className="min-w-4/5 bg-white flex items-center gap-2 rounded-full border p-2 shadow-lg shadow-gray-200">
                            <MdOutlineError size={'18px'} color="#352A7A" />
                            <span className="text-red-500 text-sm pr-2">Invalid <strong>Username</strong> or <strong>Password</strong></span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Login