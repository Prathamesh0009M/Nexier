import React from 'react';
import { useSelector } from 'react-redux';

const ConversationList = ({ conversations, handleConversationClick }) => {
    const { user } = useSelector((state) => state.profile);

    return (
        <div className="flex flex-col w-full md:w-full bg-richblack-700">
            {conversations.length > 0 ? (
                conversations.map((conversation) => {
                    // Extract participants
                    const participant = conversation.participants.find(participant => participant.email !== user.email);

                    const participantName = participant ? `${participant.firstName} ${participant.lastName}` : "Unknown";

                    return (
                        <div
                            key={conversation._id}
                            onClick={() => handleConversationClick(conversation)}
                            className="flex items-center p-4     border-b border-gray-200 cursor-pointer hover:bg-richblack-800 "
                        >
                            <img
                                src={conversation.ImageUrl_1 && conversation.ImageUrl_2 ? (user.image === conversation.ImageUrl_1 ? conversation.ImageUrl_2 : conversation.ImageUrl_1) : (conversation.commonImage)}

                                alt="Profile"
                                className="h-12 w-12 rounded-full object-cover mr-4"
                            />
                            <div className="flex-grow">
                                <h4 className="text-sm font-semibold">{conversation._id === '66f840e0880017cf58164dde' ? conversation.commonName : participantName}</h4>
                                <p className="text-xs text-gray-600">
                                    {conversation.lastMessage?.content || 'No message yet'}
                                </p>
                            </div>
                            <span className="text-xs text-gray-400">
                                {conversation.lastMessage?.sentAt
                                    ? new Date(conversation.lastMessage.sentAt).toLocaleTimeString([], { timeStyle: 'short' })
                                    : 'No messages'}
                            </span>
                        </div>
                    );
                })
            ) : (
                <p className="p-4 text-center text-gray-500">No conversations available</p>
            )}
        </div>
    );
};

export default ConversationList;
