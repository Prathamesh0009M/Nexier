import React, { useEffect, useState } from 'react';
import { followerData, randomUser, followFriend } from '../../../../services/operations/profileApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import HighlightText from '../../../common/HighlightText';

const FollowList = () => {
    const { token } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.profile);

    const [showFollowing, setShowFollowing] = useState(false);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [randomGuy, setRandomGuy] = useState([]); // Initialize as an empty array
    const [followStatus, setFollowStatus] = useState({}); // State to manage follow status for each user

    useEffect(() => {
        const fetchFollowerData = async () => {
            try {
                const response = await followerData(token);
                setFollowing(response.data.following);
                setFollowers(response.data.followers);

                const res = await randomUser(user._id, token);

                
                // Check if res is valid and is an array before setting it
                if (res && Array.isArray(res)) {
                    setRandomGuy(res); // Update this according to the API response structure
                } else {
                    setRandomGuy([]); // Ensure it's an empty array if response is invalid
                }
            } catch (error) {
                console.error("Error fetching follower data:", error);
                setRandomGuy([]); // Set to empty array if there's an error
            }
        };

        fetchFollowerData();
    }, [token]);

    const navigate = useNavigate();

    const handleViewProfile = (friendId) => {
        navigate(`/profile/${friendId}`);
    }

    const handleMessageClick = () => {
        navigate('/chat');
    }

    const handleFollowClick = async (friendId) => {
       
        
        try {
            const res = await followFriend(friendId, token); // replace with actual API call

            // Update local state to reflect that the user is now followed
            if (res.success) {
                setFollowStatus(prevStatus => ({
                    ...prevStatus,
                    [friendId]: true, // Mark this user as followed
                }));
            }
        } catch (error) {
            console.error("Failed to follow user:", error);
        }
    }
    return (
        <div className="p-4 bg-richblack-700 text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{showFollowing ? 'Following' : 'Followers'}</h2>
                <IconBtn
                    text={showFollowing ? 'Show Followers' : 'Show Following'}
                    onclick={() => setShowFollowing(!showFollowing)}
                />
            </div>
            <div className="flex flex-col gap-2">
                {(showFollowing ? following : followers).map((user, index) => (
                    <div key={index} className="flex items-center justify-between px-4 py-2 bg-richblack-900 rounded-md">
                        <div className="flex items-center" onClick={() => handleViewProfile(user.id)}>
                            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <p className="font-semibold">{user.firstName} {user.lastName}</p>
                                <p className="text-gray-400 text-sm">{user.username}</p>
                            </div>
                        </div>
                        <button
                            className="message-btn bg-richblack-500 hover:bg-richblack-800 text-white font-bold py-2 px-4 rounded"
                            onClick={handleMessageClick}
                        >
                            Message
                        </button>
                    </div>
                ))}
            </div>
            <hr />

            {/* Random Users Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4"> <HighlightText text={"Grow Your Network In "}/> DBATU..</h2>
                <div className="overflow-y-auto h-60">
                    {randomGuy.length > 0 ? (randomGuy.map((user, index) => (
                        <div key={index} className="flex items-center justify-between px-4 py-2 bg-richblack-900 rounded-md mb-2">
                            <div className="flex items-center" onClick={() => handleViewProfile(user._id)}>
                                <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <p className="font-semibold">{user.firstName} {user.lastName}</p>
                                    <p className="text-gray-400 text-sm">{user.YearAndBranch}</p>
                                    {user.about && <p className="text-gray-400 text-sm">{user.about}</p>}
                                </div>
                            </div>
                            <button
                                onClick={() => handleFollowClick(user._id)}
                                className={`py-1 px-4 rounded-md mt-auto ${followStatus[user._id] ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                disabled={followStatus[user._id]} // Disable button if already following
                            >
                                {followStatus[user._id] ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    ))) : (
                        <div>
                            Unable To Fetch User
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .message-btn, .follow-btn {
                    transition: background-color 0.3s;
                }
                @media (max-width: 768px) {
                    .message-btn, .follow-btn {
                        font-size: 12px;
                        padding: 6px 12px;
                    }
                }
            `}</style>
        </div>
    );
};

export default FollowList;
