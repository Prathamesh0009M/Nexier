import React, { useState } from "react";
import { AddQuetionPaper } from "../../../../services/operations/profileApi"
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPyq = () => {
    const { token } = useSelector((state) => state.profile);
    const [formData, setFormData] = useState({
        branch: "",
        year: "",
        title: "",
        subject: "",
        file: null,
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle file input
    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, file: e.target.files[0] }));
    };
    const navigate = useNavigate();
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = new FormData();
            form.append("branch", formData.branch);
            form.append("year", formData.year);
            form.append("title", formData.title);
            form.append("subject", formData.subject);
            form.append("file", formData.file);
            form.append("YearofPaper", formData.YearofPaper);

            const response = await AddQuetionPaper(form, token,navigate);
            // console.log("pyw............0.", response)
            // if (response.data.success) {
            //     setMessage("PYQ uploaded successfully!");
            // } else {
            //     setMessage("Failed to upload PYQ.");
            // }

            setLoading(false);
        } catch (error) {
            console.error("Error uploading PYQ:", error);
            setMessage("An error occurred while uploading the PYQ.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-richblack-700 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-richblack-50">Upload PYQ</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2  text-richblack-5">Branch</label>
                    <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., Computer Science"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-richblack-5">Year</label>
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., 2024"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-richblack-5">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., Operating Systems PYQ"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-richblack-5">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., Operating Systems"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-richblack-5">Year Of Paper</label>
                    <input
                        type="text"
                        name="YearofPaper"
                        value={formData.YearofPaper}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="e.g., Operating Systems"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-richblack-5">Upload File (PDF/Image)</label>
                    <input
                        type="file"
                        name="file"
                        accept="application/pdf, image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload PYQ"}
                </button>
            </form>

            {message && <p className="mt-4 text-center text-richblack-5">{message}</p>}
        </div>
    );
};

export default AddPyq;
