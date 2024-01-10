import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../App";
import { Link } from "react-router-dom";

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
            if(result.error) {
                throw new Error(result.error)
            }
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
            <div>
                {error.split(" ").includes('Account')
                    ? <h3><Link to={"/register"}>{error}</Link></h3>
                    : <h3>{error}</h3>}
            </div>
        </div>
    )
}

export default Login;

