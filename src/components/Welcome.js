import { useLocation } from "react-router-dom";
import { BE_URL } from "../App";
import { useState } from "react";
import './Welcome.scss'

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
            <div className="card_container">
                {
                    users.map((user, index) => {
                        return <div className="card" key={index} style={{ border: '1px solid #888' }}>
                            <div className="card_content">
                                <p>Name: {user.name}</p>
                                <p>Mobile: {user.mobile}</p>
                                <p>Email: {user.email}</p>
                            </div>
                            <div className="card_icons">
                                <i class="fa-solid fa-trash"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Welcome;
