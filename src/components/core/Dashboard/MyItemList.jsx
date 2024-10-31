import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../Dashboard/owner/ProductTable';
import { ownersAllProduct } from '../../../services/operations/itemapi';
import IconBtn from '../../common/IconBtn';

const MyItemList = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [items, setitems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const result = await ownersAllProduct(token);
            if (result) {
                setitems(result || []);
            }
        };
        fetchItems();
    }, [token]);

    return (
        <div className='text-white p-8'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold text-gray-100'>My Products</h1>
                <IconBtn
                    text={"Add New Product"}
                    onclick={() => navigate("/dashboard/add-item")}
                    className='bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 px-6 py-2 rounded-md'
                />
            </div>

            {items && <ProductTable items={items} setitems={setitems} />}
        </div>
    );
};

export default MyItemList;
