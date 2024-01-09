import { useLocation } from "react-router-dom";
import { BE_URL } from "../App";
import { useState } from "react";

function Welcome() {
    const { state } = useLocation()
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    console.log('STATE:::', state)
    const getAllUsers = () => {
        fetch(BE_URL + '/users').then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => setError(err.message))
    }
    return (
        <div>
            <div>
                <h1>Hiiii, {state.name}</h1>
                <h3>Mobile: {state.mobile}</h3>
                <h3>Email: {state.email}</h3>
            </div>
            <div><h5>{error}</h5></div>
            <button onClick={getAllUsers}>Get All users</button>
            <div>
                {
                    users.map(user => {
                        return <div key={user.id} style={{border: '1px solid #888'}}>
                            <h3>Sl.No -{user.id}</h3>
                            <h3>Name: {user.name}</h3>
                            <h3>Mobile: {user.mobile}</h3>
                            <h3>Email: {user.email}</h3>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Welcome;
