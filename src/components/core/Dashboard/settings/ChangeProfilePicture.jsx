import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_Dp } from '../../../../services/operations/settingsApi';
import IconBtn from '../../../common/IconBtn';

const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile);

    const { token } = useSelector((state) => state.auth);
    const [preview, setPreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    
    

    useEffect(() => {
        if (user && user.image) {
            setPreview(user.image);
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!selectedImage) return alert('Please select a file first!');
        dispatch(update_Dp(selectedImage, token));
        setPreview(null);
    };

    return (
        <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-richblack-5">Upload Your Profile Picture</h2>
            <form onSubmit={handleOnSubmit} className="flex flex-col md:flex-row items-center gap-4">
                {user && (
                    <img
                        src={preview || user.image}
                        alt={`profile-${user.firstName}`}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                <IconBtn text={'Upload'} disabled={!selectedImage} />
            </form>
        </div>
    );
};

export default ChangeProfilePicture;
