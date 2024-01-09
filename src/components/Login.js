import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../App";

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
        fetch(BE_URL+'/login',{
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type":"application/json"
            }

        }).then((res) => res.json())
        .then((result) => {
            console.log('result==', result);
            navigate('/welcome',{state: result})
        }).catch((err) => {
            console.log(' == error', err);
            setError(err.message)
        })
        console.log('15==', userData);

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='email' placeholder='user mail' onChange={handleChange} value={userData.email} />
                </div>
                
                <div>
                    <input type='text' name='password' placeholder='enter password' onChange={handleChange} value={userData.password} />
                </div>
                <button type="submit" >Submit</button>
            </form>
            <h3>{error}</h3>
        </div>
    )
}

export default Login;

