import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { advanceSearch } from '../../../services/operations/pageAndComponentData';
import Card from "../../common/Card";

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const [results, setResults] = useState([]);
    const [categoryBaseData, setcategoryBaseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await advanceSearch(query);
                setResults(response.data);
                setcategoryBaseData(response.data[0].category.Items)
                // console.log("owner category based data are ............",response.data[0].category.Items)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className='w-11/12 ml-10 mr-3'>
            <div className="p-4 flex flex-col items-center">
                <h1 className="text-2xl text-white font-bold mb-4">Search Results for "{query}"</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>

                <h1 className="text-2xl mt-10 mb-3 text-white font-bold mb-4">Other Related to : {query}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryBaseData.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>


            </div>
        </div>
    );
};

export default SearchResults;
