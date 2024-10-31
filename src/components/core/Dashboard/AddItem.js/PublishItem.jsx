import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetItemState, setStep } from "../../../../slices/itemSlice";
import { ITEM_STATUS } from "../../../../data/status";
import { editItemDetails, StatusChange } from "../../../../services/operations/itemapi";
import IconBtn from '../../../common/IconBtn';
import { useParams, useNavigate } from 'react-router-dom';

const PublishItem = () => {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const { item, editItem } = useSelector((state) => state.item);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const resolveItem = async () => {
            if (item && item instanceof Promise) {
                const resolvedItem = await item;
                if (resolvedItem?.status === ITEM_STATUS.PUBLISHED) {
                    setValue("public", true);
                }
            } else if (item?.status === ITEM_STATUS.PUBLISHED) {
                setValue("public", true);
            }
        };
        resolveItem();
    }, [item, setValue]);

    const handleItemPublish = async () => {
        const formStatus = getValues("public");
        if (item?.status === formStatus) {
            goToItem();
            return;
        }

        const formData = new FormData();
        formData.append("itemId", editItem ? itemId : item?.data?.newProduct._id);
        formData.append("ItemStatus", formStatus ? ITEM_STATUS.PUBLISHED : ITEM_STATUS.DRAFT);

        setLoading(true);
        const result = await StatusChange(formData, token);
        if (result) {
            goToItem();
        }
        setLoading(false);
    };

    const goBack = () => {
        dispatch(setStep(1));
    };


    const goToItem = () => {
        dispatch(resetItemState());
        navigate("/dashboard/my-items");
    };

    return (
        <div className='rounded-md border bg-gray-800 p-6 border-gray-700'>
            <p className="text-lg font-semibold text-gray-300">Publish Item</p>
            <form onSubmit={handleSubmit(handleItemPublish)} className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label htmlFor="public" className="ml-2 block text-sm text-gray-300">
                        Make this item public
                    </label>
                </div>
                <div className='flex justify-end gap-3'>
                    <button
                        type="button"
                        onClick={goBack}
                        className='px-4 py-2 text-sm text-gray-300 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50'
                        disabled={loading}
                    >
                        Back
                    </button>
                    <IconBtn
                        onClick={handleItemPublish}
                        text="Save Changes"
                        loading={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default PublishItem;
