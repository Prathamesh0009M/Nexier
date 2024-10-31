import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationList from "../components/core/chat/ConversationList ";
import SelectedConversationDetails from "../components/core/chat/SelectedConversationDetails ";
import SendMessage from "../components/core/chat/SendMessage";
import { getUserAllData } from '../services/operations/profileApi';
import { getMessageData } from "../services/operations/itemapi";


const WebSkt = () => {
    const { token } = useSelector((state) => state.auth);

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [socket, setSocket] = useState(null);
    const [content, setContent] = useState('');
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const { ownerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                // console.error('No token found, redirecting to login...');
                navigate('/login'); // Redirect to login if no token
                return;
            }
            try {
                const res = await getUserAllData(token, navigate);
                if (res.data) {
                    setUserData(res.data);
                    // console.log("User Data:", res.data);
                    setConversations(res.data.converSationId.sort((a, b) => new Date(b.lastMessage?.sentAt) - new Date(a.lastMessage?.sentAt)));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect if token is invalid or unauthorized
                    return;
                }
            }
        };
        fetchData();
    }, [token, navigate]);


    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            if (selectedConversation) {
                newSocket.emit('joinConversation', { conversationId: selectedConversation._id });
            }
        });

        newSocket.on('receiveMessage', (message) => {
            if (message.conversationId === selectedConversation?._id) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
            setConversations((prevConversations) =>
                prevConversations.map((conversation) =>
                    conversation._id === message.conversationId
                        ? { ...conversation, lastMessage: message }
                        : conversation
                ).sort((a, b) => new Date(b.lastMessage?.sentAt) - new Date(a.lastMessage?.sentAt))
            );
        });

        return () => newSocket.close();
    }, [selectedConversation]);

    const sendMessage = () => {
        if (socket && selectedConversation) {
            const userId = userData._id;
            const recipient = selectedConversation.participants?.find(participant => participant._id !== userId);

            const recipientId = recipient ? recipient._id : ownerId;

            const messageData = {
                conversationId: selectedConversation._id,
                senderId: userId,
                recipientId: recipientId,
                content: content,
                sentAt: new Date().toISOString(),
            };

            socket.emit('sendMessage', messageData);
            // setMessages((prevMessages) => [...prevMessages, messageData]);
            setContent('');  // Clear the input after sending
        } else {
            console.error("Cannot send message: selectedConversation is undefined");
        }
    };


    const handleConversationClick = async (conversation) => {

        setSelectedConversation(conversation); // Set the entire conversation object
        setMessages([]); // Clear current messages to fetch new ones

        try {
            // Fetch old messages for the selected conversation
            const response = await getMessageData({ conversationId: conversation._id }, token);
            setMessages(response || []); // Adjust based on your response structure
        } catch (error) {
            console.error('Error fetching messages:', error);
        }

        setContent(''); // Clear the input for a new message
    };



    return (
        <div className='flex flex-col lg:flex-row bg-gray-800 text-white h-screen'>
            {/* <h1 className='text-2xl text-center p-4'>Hello Ji...!</h1> */}
            <div className='w-full lg:w-1/3 p-4 overflow-y-auto'>
                <ConversationList conversations={conversations} handleConversationClick={handleConversationClick} />
            </div>
            {selectedConversation && (
                <div className='w-full lg:w-2/3 p-4 border-l border-gray-700'>
                    <SelectedConversationDetails messages={messages} selectedConversation={selectedConversation} userData={userData} />

                    {/* <div className='overflow-y-auto h-64 mb-4'>
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.senderId === userData._id ? 'justify-end' : 'justify-start'} mb-2`}>
                                <div className={`max-w-xs rounded-lg p-2 text-white ${message.senderId === userData._id ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                    <p className='font-semibold'>{message.senderId === userData._id ? 'You' : 'Recipient'}:</p>
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        ))}
                    </div> */}

                    <SendMessage selectedConversation={selectedConversation} content={content} setContent={setContent} sendMessage={sendMessage} />
                </div>
            )}
        </div>
    );
};

export default WebSkt;
