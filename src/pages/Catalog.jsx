import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { apiConnector } from '../services/apiConnector';
import ItemSlider from '../components/core/catalog/ItemSlider';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { categoryApi } from '../services/api';

const Catalog = () => {
    const { catalogName } = useParams();
    const [catalogPageData, setcatalogPageData] = useState(null);
    const [categoryId, setcategoryId] = useState("");

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiConnector("GET", categoryApi.GET_ALL_CATEGORY_API);
                const categoriesData = res?.data?.data;
                if (categoriesData && categoriesData.length > 0) {
                    const matchingCategory = categoriesData.filter((ct) =>
                        ct.name.split(" ").join("-").toLowerCase() === catalogName
                    )[0];
                    const matchingCategory2 = categoriesData.filter((ct) =>
                        ct.name === catalogName
                    )[0];

                    if (matchingCategory || matchingCategory2) {
                        const settingCategory = matchingCategory ? matchingCategory._id : matchingCategory2._id;
                        setcategoryId(settingCategory);
                    } else {
                        console.warn(`No matching category found for catalogName: ${catalogName}`);
                    }
                } else {
                    console.error("No categories data available from the API");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            if (categoryId) {
                try {
                    const res = await getCatalogPageData(categoryId);
                    setcatalogPageData(res?.data);
                    
                } catch (error) {
                    console.log("Error fetching category details:", error);
                }
            }
        }
        getCategoryDetails();
    }, [categoryId]);

    return (
        <div className='bg-gray-900 text-white p-4'>
            <div className='max-w-7xl mx-auto'>
                <div className='mb-6'>
                    <p className='text-lg font-semibold'>
                        Home / Catalog / <span className='text-indigo-400'>{catalogPageData?.selectedCategory?.name}</span>
                    </p>
                    <p className='text-2xl font-bold mt-2'>{catalogPageData?.selectedCategory?.name}</p>
                    <p className='text-lg mt-2 text-gray-400'>{catalogPageData?.selectedCategory?.description}</p>
                </div>

                {/* Section 1 */}
                <div className='my-8'>
                    <h2 className='text-xl font-bold mb-4'>Top Recommendations</h2>
                    <div className='flex gap-4'>
                        <p className='px-4 py-2 bg-indigo-600 rounded-lg cursor-pointer'>Most Popular</p>
                        <p className='px-4 py-2 bg-gray-700 rounded-lg cursor-pointer'>New</p>
                    </div>
                    <div className='mt-6'>
                        <ItemSlider Items={catalogPageData?.selectedCategory.Items} />
                    </div>
                </div>

                {/* Section 2 */}
                <div className='my-8'>
                    <h2 className='text-xl font-bold mb-4'>Top Products in {catalogPageData?.selectedCategory?.name}</h2>
                    <div>
                        <ItemSlider Items={catalogPageData?.selectedCategory.Items} />
                    </div>
                </div>

                {/* Footer */}
                <div className='text-center mt-12'>
                    <p className='text-gray-500'>© 2024 Your Catalog Website</p>
                </div>
            </div>
        </div>
    )
}

export default Catalog;
