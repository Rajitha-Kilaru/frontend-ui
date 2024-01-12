import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../App";
import { Link } from "react-router-dom";
import './Login.scss'

function Login() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(BE_URL + '/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error)
                }
                navigate('/welcome', { state: result })
            }).catch((err) => {
                setError(err.message)
            })
    }

    return (
        <div className="login">
            <div>
                <h3 className="log_title">Login Here</h3>
                <form className="login_cont" onSubmit={handleSubmit}>
                    <div>
                        <input type='text' name='email' placeholder='user mail' onChange={handleChange} value={userData.email} />
                    </div>

                    <div>
                        <input type='text' name='password' placeholder='enter password' onChange={handleChange} value={userData.password} />
                    </div>
                    <div className="login_btn">
                        <button type="submit" >Login</button>
                    </div>
                </form>
                <div className="err_cont"> 
                    {error.split(" ").includes('Account')
                        ? <h3 className="reg_link"><Link to={"/register"}>{error}</Link></h3>
                        : <h3 className="err_msg">{error}</h3>}
                </div>
            </div>
        </div>
    )
}

export default Login;

