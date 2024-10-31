import React, { useState } from 'react';
import { addCategory } from '../../../../services/operations/itemapi';
import { useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';

const Create_Category = () => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const { token } = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const response = addCategory(formData, token);
    };

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-800 p-4">
            {/* Nexier Student Network Title */}
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                Nexier Student Network
            </h1>

            {/* Create Category Form */}
            <form
                onSubmit={handleOnSubmit}
                className="bg-richblack-800 rounded-lg shadow-lg p-8 w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center text-white mb-4">
                    Create Category
                </h2>

                <div className="flex flex-col space-y-2">
                    <label className="text-gray-300" htmlFor="name">Category Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleOnChange}
                        placeholder="Enter Category"
                        className="p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-gray-300" htmlFor="description">Category Description</label>
                    <input
                        required
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleOnChange}
                        placeholder="Description..."
                        className="p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <IconBtn
                    text={"Submit"}
                    customClasses="w-full md:w-auto" // Full width on mobile, auto on larger screens
                />

            </form>
        </div>
    );
}

export default Create_Category;
