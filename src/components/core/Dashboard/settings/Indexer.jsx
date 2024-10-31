import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import Change_About from './Change_About'
import Delete from "./Delete"
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'

const Indexer = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/forgot-password")
    }
    return (
        <div className="max-w-5xl mx-auto p-4 space-y-8">
            <ChangeProfilePicture />
            <Change_About />

            <div className='border-white '>
                <p className='text-pink-300 text-2xl '>" 2 Step Change Password Process "</p>

                <IconBtn
                    onclick={() => handleClick()}
                    text={'Change Password'}
                    customClasses={'bg-green-400'}
                />
            </div>
            <Delete />
        </div>
    )
}

export default Indexer
