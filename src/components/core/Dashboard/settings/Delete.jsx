import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Delete_Account } from '../../../../services/operations/settingsApi'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin5Line } from "react-icons/ri"

const Delete = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        setLoading(true);
        await dispatch(Delete_Account(user?._id, token, navigate));
        setLoading(false);
    };

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg space-y-4">
            <div className="flex items-center space-x-2">
                <RiDeleteBin5Line className="text-2xl"/>
                <h2 className="text-xl font-semibold">Delete Account</h2>
            </div>
            <p>Are you sure you want to delete your account? This action is permanent and cannot be undone.</p>
            <button 
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 text-white py-2 px-4 rounded-lg transition hover:bg-red-700">
                {loading ? "Deleting..." : "Delete Account"}
            </button>
        </div>
    )
}

export default Delete
