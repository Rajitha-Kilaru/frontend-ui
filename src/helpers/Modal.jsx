import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { BE_URL } from "../App";

const Modal = ({ setShowModal, editableData, setUsers }) => {
    const [formEditData, setFormEditData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
    })
    const [saveErr, setSaveErr] = useState('')

    const handleEditChange = (e) => {
        setFormEditData({ ...formEditData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setFormEditData(editableData)
    }, [editableData])

    const handleSaveBtn = () => {
        fetch(BE_URL + '/auth/updateUser', {
            method: 'PUT',
            body: JSON.stringify({ id: formEditData._id, data: formEditData }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json()
        }).then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
            setUsers(result)
            // setUsers((prev) => {
            //     console.log("37==", prev)
            //     return prev.map((item) => {
            //         if (item._id === result._id) {
            //             return item = result
            //         }
            //         return item
            //     })
            // })
            setShowModal(false)
            return result;
        }).catch((err) => {
            setSaveErr(err.message)
        })
    }

    return (
        <>
            <div className={styles.darkBG} onClick={() => setShowModal(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Edit Form</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                        <i class="fa-regular fa-circle-xmark"></i>
                    </button>
                    <div className={styles.modalContent}>
                        <p>{saveErr}</p>
                        <div>
                            <label>Name:</label>
                            <input type='text' name='name' placeholder='Name' onChange={handleEditChange} value={formEditData.name} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type='text' name='email' placeholder='Email' onChange={handleEditChange} value={formEditData.email} disabled />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type='text' name='password' placeholder='Password' onChange={handleEditChange} value={formEditData.password} />
                        </div>
                        <div>
                            <label>Number:</label>
                            <input type='text' name='mobile' placeholder='Number' onChange={handleEditChange} value={formEditData.mobile} />
                        </div>
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button className={styles.saveBtn} onClick={() => handleSaveBtn()}>
                                save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;