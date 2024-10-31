import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tr, Th, Tbody, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { ITEM_STATUS } from '../../../../data/status';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { ownersAllProduct, deleteItem } from "../../../../services/operations/itemapi";

const ProductTable = ({ items = [], setitems }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleDeleteProduct = async (itemId) => {
        setLoading(true);
        await deleteItem({ itemId }, token);
        const result = await ownersAllProduct(token);

        if (result) {
            setitems(result || []);
        }

        setLoading(false);
        setConfirmationModal(null);
    };

    return (
        <div className="text-white">
            <div className="overflow-x-auto">
                <Table className="w-full">
                    <Thead className="bg-gray-800 text-gray-100">
                        <Tr>
                            <Th className="px-2 py-3 text-xs md:px-6 md:py-3">Products</Th>
                            <Th className="px-2 py-3 text-xs md:px-6 md:py-3">Description</Th>
                            <Th className="px-2 py-3 text-xs md:px-6 md:py-3">Price</Th>
                            <Th className="px-2 py-3 text-xs md:px-6 md:py-3">Actions</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {items.length === 0 ? (
                            <Tr>
                                <Td colSpan={4} className="text-center py-6 text-lg text-gray-400">
                                    No Items Found
                                </Td>
                            </Tr>
                        ) : (
                            items.map((item) => (
                                <Tr key={item._id} className="border-b border-gray-700 hover:bg-gray-900">
                                    <Td className="px-2 py-2 md:px-6 md:py-4">
                                        <img
                                            src={item?.thumbnail}
                                            className="h-16 w-24 md:h-24 md:w-36 rounded-lg object-cover shadow-lg"
                                            alt="item Thumbnail"
                                        />
                                        <p className="mt-1 text-sm font-semibold md:mt-2">{item.title}</p>
                                    </Td>
                                    <Td className="px-2 py-2 md:px-6 md:py-4">
                                        <p className="text-xs md:text-base">{item.description}</p>
                                        <p className="text-xs text-gray-500">Created: {item.createdAt}</p>
                                        {item.ItemStatus === ITEM_STATUS.DRAFT ? (
                                            <p className="text-pink-600 font-bold">DRAFTED</p>
                                        ) : (
                                            <p className="text-yellow-400 font-bold">PUBLISHED</p>
                                        )}
                                    </Td>
                                    <Td className="px-2 py-2 md:px-6 md:py-4 text-lg font-semibold">
                                        ${item.price}
                                    </Td>
                                    <Td className="px-2 py-2 md:px-6 md:py-4 flex flex-col md:flex-row gap-2 md:gap-3">
                                        <button
                                            disabled={loading}
                                            onClick={() => navigate(`/dashboard/edit-item/${item._id}`)}
                                            className="px-2 py-1 md:px-4 md:py-2 bg-blue-600 text-xs md:text-sm text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            EDIT
                                        </button>
                                        <button
                                            disabled={loading}
                                            onClick={() => setConfirmationModal({
                                                text1: "Do you want to delete this product?",
                                                text2: "All the data related to this product will be deleted.",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading ? () => handleDeleteProduct(item._id) : () => { },
                                                btn2Handler: () => setConfirmationModal(null),
                                            })}
                                            className="px-2 py-1 md:px-4 md:py-2 bg-red-600 text-xs md:text-sm text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                                        >
                                            DELETE
                                        </button>
                                    </Td>
                                    {/* Horizontal line for mobile */}
                                    <Td colSpan={4}>
                                        <hr className="mt-4 mb-2 block md:hidden border-t border-gray-600" />
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default ProductTable;
