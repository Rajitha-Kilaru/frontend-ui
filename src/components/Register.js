import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BE_URL } from "../App";
import './Register.scss'

function Register() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
        setError('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        fetch(BE_URL + '/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json()
        }).then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
            navigate('/login')
        }).catch((err) => {
            setError(err.message)
        })
    }
    return (
        <div className="register">
            <div>
                <h3 className="title">Create an Account</h3>
                <form className="form_container" onSubmit={handleSubmit}>
                    <div>
                        <input type='text' name='name' placeholder='User Name' onChange={handleChange} value={userData.name} />
                    </div>
                    <div>
                        <input type='text' name='email' placeholder='User Email' onChange={handleChange} value={userData.email} />
                    </div><div>
                        <input type='text' name='mobile' placeholder='Mobile Number' onChange={handleChange} value={userData.mobile} />
                    </div><div>
                        <input type='text' name='password' placeholder='Password' onChange={handleChange} value={userData.password} />
                    </div>
                    <div className="submit_button">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            {error.split(" ").includes('login')
                ? <h3 className="reg_error">{error} <Link to={"/login"}>here</Link></h3>
                : <h3 className="reg_error">{error}</h3>}
            </div>
        </div>
    )
}

export default Register;
