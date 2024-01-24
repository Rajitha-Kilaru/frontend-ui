import { useLocation } from "react-router-dom";
import { BE_URL } from "../App";
import { useEffect, useState } from "react";
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
    // const [chessArray, setChessArray] = useState([])

    const getAllUsers = () => {
        fetch(BE_URL + '/auth/users', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then(res => res.json())
            .then(data => {
                setError('')
                console.log('21==', data);
                if (data.error) {
                    throw new Error(data.error)
                }
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
        console.log('43==', userItem);
        setDelErr('')
        fetch(BE_URL + '/auth/deleteUser', {
            method: 'DELETE',
            body: JSON.stringify({id: userItem._id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error)
                }
                setUsers(result);
                return result
            })
            .catch((error) => {
                setDelErr(error.message)
            })
    }

    // useEffect(() => {
    //     for (let i = 0; i < 64; i++) {
    //         setChessArray.push(i)
    //     }
    // }, [])
    console.log('59==', users, state, delData);
    return (
        <div>
            {state?._id === delData?.id
                ? <p>Login user is removed from database</p>
                : <div>
                    <h1>Hiiii, {state.name}</h1>
                    <h3>Mobile: {state.mobile}</h3>
                    <h3>Email: {state.email}</h3>
                </div>}
            {error && <div><h5>{error}</h5></div>}
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
            {/* <div className="chess_container">
            {chessArray.map((val, index) => <div className="chess" key={index}></div>)}
            </div> */}
        </div>
    )
}

export default Welcome;
