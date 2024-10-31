import React,{useState,useEffect} from 'react'
import { setItem, setEditItem } from '../../../../slices/itemSlice';
import RenderSteps from '../AddItem.js/RenderSteps';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItemData } from '../../../../services/operations/itemapi';

const EditItem = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const { item } = useSelector((state) => state.item)
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const populateProductDetails = async () => {
            setLoading(true)

            const result = await fetchItemData({ itemId }, token);
            if (result?.data) {
                dispatch(setEditItem(true))
                dispatch(setItem(result?.data))
                
                

            }
            setLoading(false)

        }
        populateProductDetails();
    }, [])


    if (loading) {
        return (
            <div>Loading...</div>
        )

    }
 
    return (
        <div className='text-richblack-5'>
                              <p className="text-2xl">Add Items</p>

            <div>
                {item?(<RenderSteps />):(<p>Iten Not Found</p>)}

            </div>

        </div>
    )
}

export default EditItem
