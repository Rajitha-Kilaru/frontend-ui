import { useLocation } from "react-router-dom";
import { BE_URL } from "../App";
import { useState } from "react";
import './Welcome.scss'
import Modal from "../helpers/Modal";

function Welcome() {
    const { state } = useLocation()
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const [editableData, setEditableData] = useState()
    const [showModal, setShowModal] = useState(false)
    const [delErr, setDelErr] = useState('')
    const [delData, setDelData] = useState()

    const getAllUsers = () => {
        fetch(BE_URL + '/users').then(res => res.json())
            .then(data => {
                setError('')
                setUsers(data)
            })
            .catch(err => setError(err.message))
    }

    const handleEditBtn = (userInfo) => {
        setEditableData(userInfo)
        setShowModal(true)
    }

    const handleDeleteBtn = (userItem) => {
        setDelData(userItem)
        setDelErr('')
        fetch(BE_URL + '/deleteUser', {
            method: 'DELETE',
            body: JSON.stringify(userItem),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((result) => {
            if(result.error) {
                throw new Error(result.error)
            }
            setUsers(result);
            return result
        })
        .catch((error) => {
            setDelErr(error.message)
        })
    }
    return (
        <div>
            {state?.id === delData?.id 
            ? <p>Login user is removed from database</p>
            :<div>
                <h1>Hiiii, {state.name}</h1>
                <h3>Mobile: {state.mobile}</h3>
                <h3>Email: {state.email}</h3>
            </div>}
            <div><h5>{error}</h5></div>
            <button onClick={getAllUsers}>Get All users</button>
            <div className="card_container">
                {delErr && <p>{delErr}</p>}
                {
                    users.map((user, index) => {
                        return <div className="card" key={index} style={{ border: '1px solid #888' }}>
                            <div className="card_content">
                                <p>Name: {user.name}</p>
                                <p>Mobile: {user.mobile}</p>
                                <p>Email: {user.email}</p>
                            </div>
                            <div className="card_icons">
                                <i onClick={() => handleDeleteBtn(user)} className="fa-solid fa-trash"></i>
                                <i onClick={() => handleEditBtn(user)} className="fa-solid fa-pen-to-square"></i>
                            </div>
                        </div>
                    })
                }
                {showModal && <Modal setShowModal={setShowModal} editableData={editableData} setUsers={setUsers} />}
            </div>
        </div>
    )
}

export default Welcome;
