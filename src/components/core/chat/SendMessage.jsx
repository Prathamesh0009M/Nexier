const SendMessage = ({ content, setContent, sendMessage }) => {
    return (
        <div>
            <h4 className='font-semibold'>Send a Message</h4>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message here"
                className=' text-richblack-800 w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows={3}
            />
            <button
                onClick={sendMessage}
                className='w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300'
            >
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;
