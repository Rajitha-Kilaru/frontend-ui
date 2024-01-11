import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BE_URL } from "../App";

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
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        fetch(BE_URL + '/register', {
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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='name' placeholder='user name' onChange={handleChange} value={userData.name} />
                </div>
                <div>
                    <input type='text' name='email' placeholder='user mail' onChange={handleChange} value={userData.email} />
                </div><div>
                    <input type='text' name='mobile' placeholder='mobile number' onChange={handleChange} value={userData.mobile} />
                </div><div>
                    <input type='text' name='password' placeholder='enter password' onChange={handleChange} value={userData.password} />
                </div>
                <button type="submit" >Submit</button>
            </form>
            <div>
                {error.split(" ").includes('login')
                    ? <h3>{error} <Link to={"/login"}>here</Link></h3>
                    : <h3>{error}</h3>}
            </div>
        </div>
    )
}

export default Register;
