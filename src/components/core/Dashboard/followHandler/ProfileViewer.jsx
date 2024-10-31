import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFriendAllData } from '../../../../services/operations/profileApi';
import { useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';

const ProfileViewer = () => {
    const { friendId } = useParams();
    const { token } = useSelector((state) => state.profile);
    const [friendData, setFriendData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriendData = async () => {
            const response = await getFriendAllData(friendId, token);
            setFriendData(response);
        };

        fetchFriendData();
    }, [friendId, token]);

    if (!friendData) return <div className="text-center">Loading...</div>;
    // console.log("Ddddddddddddddddd",friendData)

    const { firstName, lastName, email, image, follower, following, itemsToSell,YearAndBranch } = friendData;

    return (
        <div className="max-w-md md:max-w-2xl mx-auto p-4">
            <div className="bg-richblack-800 text-richblack-5 mt-5 shadow-md rounded-lg p-6">
                <img
                    src={image}
                    alt={`${firstName} ${lastName}`}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-4"
                />

                <h1 className="text-xl md:text-2xl font-semibold text-center">{`${firstName} ${lastName}`}</h1>
                
                <p className="text-gray-600 text-center text-sm md:text-base">{friendData.additionaldetail.about||email}</p>
                <p className='text-richblack-100 items-center flex justify-center'>{ YearAndBranch}</p>

                <div className="flex flex-row md:flex-row justify-between mt-4">
                    <div className="text-center mb-4 md:mb-0">
                        <p className="text-xl font-bold">{follower.length}</p>
                        <h2 className="text-lg font-medium">Followers</h2>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold">{following.length}</p>
                        <h2 className="text-lg font-medium">Following</h2>
                    </div>
                </div>
                
                <div className="text-center mt-6 flex justify-center">
                    <IconBtn text={'Message'}
                        onclick={() => navigate("/chat")}
                        
                    />
                </div>
            </div>


            {/* Items to Sell Section */}
            <div className="mt-10">
                <h2 className="text-lg font-semibold text-richblack-25 text-center mb-4">Items for Sale</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {itemsToSell.map((item) => (
                        <div key={item._id} className="bg-richblack-800 shadow-md rounded-lg overflow-hidden"
                            onClick={() => navigate(`/item/${item._id}/owner/${item.owner}`)}
                        >
                            <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover" />
                            <div className="p-4">
                                <h3 className="text-md text-richblack-5 font-semibold">{item.title}</h3>
                                <p className="text-richblack-50">Views: {item.views}</p>
                                <p className="text-richblack-50">Condition: {item.condition}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileViewer;
