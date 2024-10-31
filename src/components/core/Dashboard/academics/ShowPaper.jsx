import React, { useState, useEffect } from 'react';
import { findQuetionPaper } from '../../../../services/operations/profileApi';
import { useSelector } from 'react-redux';
import Button from '../../../common/CTAButton';
import IconBtn from '../../../common/IconBtn';

const ShowPaper = () => {
    const { token } = useSelector((state) => state.profile);
    const [year, setYear] = useState('');
    const [branch, setBranch] = useState('');
    const [papers, setPapers] = useState(null);
    const [filteredPapers, setFilteredPapers] = useState(null); // For filtered papers
    const [filterYear, setFilterYear] = useState(''); // For year filter


    // Handle form submission to fetch papers
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('year', year);
        formData.append('branch', branch);

        try {
            const response = await findQuetionPaper(formData, token);

            
                setPapers(response);
                setFilteredPapers(response); // Initially, set filtered papers to all papers
          
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    // Handle filtering by year
    const handleYearFilter = (event) => {
        const selectedYear = event.target.value;
        setFilterYear(selectedYear);

        if (selectedYear === '') {
            // If no filter selected, show all papers
            setFilteredPapers(papers);
        } else {
            // Filter papers based on selected year
            const filtered = papers.filter(paper => paper.YearofPaper === selectedYear);
            setFilteredPapers(filtered);
        }
    };

    const handleDownload = async (fileUrl, filename = 'DBATU-PYQ') => {
        try {
            // Fetch the file from the URL
            const response = await fetch(fileUrl);
            // Ensure the fetch was successful
            if (!response.ok) {
                throw new Error('Failed to fetch file.');
            }
    
            // Create a blob from the response
            const blob = await response.blob();
    
            // Create an object URL from the blob
            const url = window.URL.createObjectURL(blob);
      
            // Create a temporary 'a' element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Set the desired file name
    
            // Append the link to the document body
            document.body.appendChild(link);
    
            // Trigger the download by simulating a click
            link.click();
    
            // Clean up by removing the link and revoking the object URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error during file download:', error);
        }
    };
    
    return (
        <div className="w-full max-w-lg mx-auto p-4">
            <h2 className="text-center text-xl text-richblack-5 font-bold mb-4">Find Question Papers</h2>
            <form onSubmit={handleSubmit} className="bg-richblack-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block  text-sm font-bold text-richblack-50 mb-2" htmlFor="year">
                        Select Year
                    </label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="shadow bg-richblack-600  text-richblack-5 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="" disabled>Select a year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        {/* Add more years as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-richblack-50 text-sm font-bold mb-2" htmlFor="branch">
                        Select Branch
                    </label>
                    <select
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-richblack-600  text-richblack-5 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="" disabled>Select a branch</option>
                        <option value="CSE">Computer Science</option>
                        <option value="IT">Information Technology</option>
                        <option value="EXTC">Electronic & Telecommunication</option>
                        <option value="ELECTRICAL">Electrical Engineering</option>
                        <option value="CIVIL">Civil Engineering</option>
                        <option value="MECHANICAL">Mechanical Engineering</option>
                        <option value="CHEMICAL">Chemical Engineering</option>
                        <option value="VLSI">VLSI</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Find Papers
                    </button>
                </div>
            </form>

            {/* Filter by Year */}
            {papers && papers.length > 0 && (
                <div className="mt-4">
                    <label className="block text-richblack-50 text-sm font-bold mb-2" htmlFor="filterYear">
                        Filter by Year of Paper
                    </label>
                    <select
                        id="filterYear"
                        value={filterYear}
                        onChange={handleYearFilter}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-richblack-5 bg-richblack-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">All Years</option>
                        {/* Generate unique years from the papers */}
                        {[...new Set(papers.map(paper => paper.YearofPaper))].map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Display the retrieved and filtered papers */}
            {filteredPapers && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-richblack-5">Available Papers:</h3>
                    {filteredPapers.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredPapers.map((paper, index) => (
                                <li key={index} className="border p-4 rounded shadow hover:shadow-lg">
                                    <span className="font-semibold text-richblack-5">
                                        {paper.title} <br /> {paper.subject}</span> 
                                    <br />

                                    {/* <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                        View Paper
                                    </a>
                                     */}
                                    
                                    <IconBtn text={'Download'} onclick={() => handleDownload(paper.fileUrl)} />
                                    
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No papers found for the selected year and branch.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowPaper;
