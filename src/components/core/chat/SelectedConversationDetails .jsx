
import { useSelector } from "react-redux";

const SelectedConversationDetails = ({ selectedConversation, messages, userData }) => {
    const { user } = useSelector((state) => state.profile);

    if (!selectedConversation) {
        return <div>No conversation selected.</div>; // Fallback message
    }

    const participants = selectedConversation.participants.find(part => part.email !== user.email);

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();

        const options = { hour: '2-digit', minute: '2-digit' };
        const timeString = date.toLocaleTimeString([], options);

        if (date.toDateString() === now.toDateString()) {
            return timeString;
        } else if (date.toDateString() === new Date(now - 86400000).toDateString()) {
            return 'Yesterday ' + timeString;
        } else {
            return date.toLocaleDateString() + ' ' + timeString;
        }
    };

    return (
        <div className='mb-4'>
            <p className="text-3xl">
                {selectedConversation._id === '66f840e0880017cf58164dde' ? (
                    <span>DBATU Community</span>
                ) : (
                    participants ? `${participants.firstName} ${participants.lastName}` : 'Unknown Participant'
                )}
            </p>

            <h4 className='font-semibold mt-4'>Messages:</h4>
            <div className='max-h-64 overflow-y-scroll border border-gray-700 p-2'>
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender !== userData._id ? 'justify-start' : 'justify-end'} mb-2`}>
                            <div className={`max-w-xs rounded-lg p-2 text-white ${message.sender === userData._id ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                <p className='font-semibold'>{message.sender === userData._id ? `${userData.firstName}` : (participants ? `${participants.firstName}` : 'Unknown')}</p>
                                <p>{message.content}</p>
                                <p className='text-xs text-gray-300'>{formatDate(message.sentAt)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No messages yet</p>
                )}
            </div>
        </div>
    );
};

export default SelectedConversationDetails;

// import { useSelector } from "react-redux";

// const SelectedConversationDetails = ({ selectedConversation, messages, userData }) => {
//     const { user } = useSelector((state) => state.profile);

//     if (!selectedConversation) {
//         return <div>No conversation selected.</div>; // Fallback message
//     }

//     const participants = selectedConversation.participants.find(part => part.email !== user.email);

    
//     // Function to format the date
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const now = new Date();

//         // Format for 'Today' or 'Yesterday'
//         const options = { hour: '2-digit', minute: '2-digit' };
//         const timeString = date.toLocaleTimeString([], options);

//         // Check if the message is from today
//         if (date.toDateString() === now.toDateString()) {
//             return timeString; // Just show time
//         }
//         // Check if the message is from yesterday
//         else if (date.toDateString() === new Date(now - 86400000).toDateString()) {
//             return 'Yesterday ' + timeString; // Show yesterday and time
//         }
//         // For older messages, show date
//         else {
//             return date.toLocaleDateString() + ' ' + timeString; // Show date and time
//         }
//     };

//     return (
//         <div className='mb-4'>
//             <p className="text-3xl">
//                 {selectedConversation._id === '66f840e0880017cf58164dde' ? (
//                     <span>DBATU Community</span>
//                 ) : (
//                     `${participants.firstName} ${participants.lastName}`
//                 )}
//             </p>


//             <h4 className='font-semibold mt-4'>Messages:</h4>
//             <div className='max-h-64 overflow-y-scroll border border-gray-700 p-2'>
//                 {Array.isArray(messages) && messages.length > 0 ? (
//                     messages.map((message, index) => (
//                         <div key={index} className={`flex ${message.sender !== userData._id ? 'justify-start' : 'justify-end'} mb-2`}>
//                             <div className={`max-w-xs rounded-lg p-2 text-white ${message.sender === userData._id ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                
//                                 <p className='font-semibold'>{message.sender === userData._id ?`${userData.firstName}` : `${participants.firstName}`}</p>
//                                 <p>{message.content}</p>
//                                 <p className='text-xs text-gray-300'>{formatDate(message.sentAt)}</p> {/* Adding the formatted time */}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No messages yet</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SelectedConversationDetails;
