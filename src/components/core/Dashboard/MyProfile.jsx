import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { friendrecommandation } from '../../../services/operations/profileApi';
import { followFriend } from '../../../services/operations/profileApi';

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const [recommandList, setRecommandList] = useState([]);

    
    useEffect(() => {
        const findMutualFriendList = async () => {
            const response = await friendrecommandation(user._id);
            // console.log("nnnnnnnnnnnrespinse", response);

            // Filter recommendations based on unique IDs not in follower or following
            const uniqueRecommendations = response.filter(recommendation => {
                return !user.following.includes(recommendation._id) &&
                    //  !user.follower.includes(recommendation._id) &&
                    recommendation._id !== user._id; // Exclude current user ID
            });

            // Use a Set to ensure unique recommendations
            const uniqueSet = new Set();
            const finalRecommendations = uniqueRecommendations.filter(recommendation => {
                if (!uniqueSet.has(recommendation._id)) {
                    uniqueSet.add(recommendation._id);
                    return true; // Keep this recommendation
                }
                return false; // Exclude duplicate recommendation
            });

            
            setRecommandList(finalRecommendations);
        };
        findMutualFriendList();
    }, [user._id, user.follower, user.following]);

    return (
        <div className='bg-richblack-800 text-richblack-100 min-h-screen py-12 px-6'>
            {/* Profile Header */}
            <div className='container mx-auto flex flex-col md:flex-row md:items-center md:space-x-6'>
                {/* Profile Image */}
                <div className='flex-shrink-0'>
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='w-32 h-32 rounded-full border-4 border-gray-300'
                    />
                </div>

                {/* Profile Details */}
                <div className='flex-1 mt-4 md:mt-0'>
                    <div className='flex items-center justify-between mb-4'>
                        <div>
                            <h1 className='text-3xl font-semibold'>{user?.firstName} {user?.lastName}</h1>
                            <p className='text-richblack-100'>{user?.email}</p>
                            <p className='text-richblack-100'>{user?.YearAndBranch}</p>
                        </div>
                        <IconBtn
                            text="Edit"
                            onclick={() => navigate("/dashboard/settings")}
                            className='bg-blue-600 hover:bg-blue-700 text-white'
                        />
                    </div>

                    <div className='flex space-x-6 mb-4'>
                        <div className='text-center'>
                            <p className='text-lg font-bold'>{user?.follower.length}</p>
                            <p className='text-richblack-100'>Followers</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-lg font-bold'>{user?.following.length}</p>
                            <p className='text-richblack-100'>Following</p>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className='mb-6'>
                        <div className='flex items-center justify-between mb-2'>
                            <p className='text-lg font-semibold'>About</p>
                            <IconBtn
                                text="Edit"
                                onclick={() => navigate("/dashboard/settings")}
                                className='bg-blue-600 hover:bg-blue-700 text-white'
                            />
                        </div>
                        <p className='text-gray-5'>{user?.additionaldetail?.about ?? <span className='text-richblack-100'>Write something about yourself...</span>}</p>
                    </div>

                    {/* Personal Details Section */}
                    <div>
                        <p className='text-lg font-semibold mb-2'>Personal Details</p>
                        <DetailItem label="First Name" value={user?.firstName} />
                        <DetailItem label="Last Name" value={user?.lastName} />
                        <DetailItem label="College Id" value={user?.collegeId} />
                        <DetailItem label="Email" value={user?.email} />
                        <DetailItem label="Gender" value={user?.additionaldetail?.gender ?? "Add Gender"} />
                        <DetailItem label="Phone Number" value={user?.additionaldetail?.contactNumber ?? "Add Contact Number"} />
                        <DetailItem label="Date of Birth" value={user?.additionaldetail?.dateOfBirth ?? "Add Date of Birth"} />
                    </div>

                    {/* Recommendation Section */}
                    <div className="mt-8">
                        <p className='text-lg font-semibold mb-2'>Explore mutual Friends</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {recommandList.map((recommendation) => (
                                <RecommendationCard key={recommendation._id} recommendation={recommendation} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className='flex justify-between mb-2'>
        <p className='font-medium text-white'>{label}</p>  {/* Changed text color to white */}
        <p className='text-richblack-50'>{value}</p>  {/* Changed text color to white */}
    </div>
);

const RecommendationCard = ({ recommendation }) => {
    const { user } = useSelector((state) => state.profile); // Get current user data
    const [isFollowing, setIsFollowing] = useState(false); // State to manage follow status

    const { token } = useSelector((state) => state.auth);

    const handleOnFollow = async () => {
        try {
            const res = await followFriend(recommendation._id, token); // replace with actual API call

            // Update local state to reflect that the user is now followed
            if (res.success) {
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Failed to follow user:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between">
            <div className="flex items-center mb-2">
                <img
                    src={recommendation.image}
                    alt={`${recommendation.firstName} ${recommendation.lastName}`}
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <div className="flex flex-col items-start ml-2">
                    <p className="font-semibold text-richblack-800">{recommendation.firstName} {recommendation.lastName}</p>
                    <p className="text-sm text-gray-600">{recommendation.YearAndBranch?recommendation.YearAndBranch:recommendation.intrestedIn}</p>
                </div>
            </div>
            <button
                onClick={handleOnFollow}
                className={`py-1 px-4 rounded-md mt-auto ${isFollowing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                disabled={isFollowing} // Disable button if already following
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    );
};

export default MyProfile;
