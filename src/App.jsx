import React, { useState, useRef, useEffect } from 'react';
import logo from './assets/Logo.png'
import default1 from './assets/default-profile.png'

export default function Screen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    //save the message to local storage
    const savedMessages = localStorage.getItem('chat-msg');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  //hooks for updating after sends a new message, it will automaticly scrolls to the newest message
  const messagesEndRef = useRef(null);

  const setScroll = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    localStorage.setItem('chat-msg', JSON.stringify(messages))
    setScroll(); //scroll to the message after updating a message
  }, [messages]);

  //handling the input field
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Add a new message
  const handleAddMsg = () => {
    if (input.trim() !== '') { // checking if the current input field is empty or whitespace
      setMessages([...messages, input]); //if it's not empty then, create a new array to an empty array containing messages
      setInput(''); //and then set input to empty string
    }
  };

  //delete function to clear all chat message on users local storage
  const handleDeleteMsg = () => {
    const confirmDelete = window.confirm('Are you sure want to delete all messages?'); //adding alert confirm message before deleting all messages 
    if (confirmDelete) {
      localStorage.removeItem('chat-msg');
      setMessages([]);
    }
  }

  // Key function so users can send the message by clicking the enter button
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddMsg();
    }
  };


  return (
    //I hate css
    <div className='h-screen overflow-y-scroll'>
        <div className='w-[350px] md:w-[600px] md:ml-10'>
            <div className='rounded-2xl text-white bg-gray-700 md:m-10 p-5 m-8 max-w-[350px] break-words'>

                <div className='flex mb-4'>
                    <img src={logo} className='w-10 h-10 mr-4 rounded-[50%]' alt="" />
                    <h1 className='font-semibold text-2xl mb-4 whitespace-normal'>
                        Arc
                    </h1>
                </div>

                This <span className='text-blue-400'><a href="https://github.com/ImArclight/Arc-SelfChat">Arc-SelfChat</a></span> is an app made so the users can chat or taking a notes here privately. All the messages are stored on users computer and users can clear all the message by clicking Delete button.
            </div>
        </div>
      <div className='mb-[100px] w-[350px] md:w-[600px] md:ml-10'>
        {/*adding your message to chat-box-bubble(?)*/}
        {messages.map((msg, index) => (
          <div key={index} className="rounded-2xl text-white bg-gray-700 p-5 m-8 md:m-10 max-w-[350px] break-words">
            {/* planning to add users name after inputting it but maybe sometimes. If you still see this then I haven't done it yet */}
            <div className='flex mb-4'>
                    <img src={default1} className='w-10 h-10 mr-4 rounded-[50%]' alt="" />
                    <h1 className='font-semibold text-2xl mb-4 whitespace-normal'>
                        User
                    </h1>
            </div>
            {msg} {/* the message users inputted */}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* scrolls end */}
      </div>
      
      {/* I hate css (2) */}
      <div className='items-end fixed bottom-8 md:w-full w-full px-7 flex justify-center'>
            <input //Input field for the user's message
            className="appearance-none border border-gray-300 rounded-lg py-2 px-4 text-white leading-tight focus:outline-none focus:border-blue-500 h-10 w-[80%] bg-gray-500"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder='Write Something here......'
            onKeyDown={handleKeyDown} //The key btn 'enter' click function
            />
        <button
          onClick={handleAddMsg} // btn function to add or inputting user's message
          className='appearance-none border border-gray-300 h-10 bg-gray-500 rounded-lg py-2 px-4 text-white'
        >
          Send
        </button>
        <button 
            className='appearance-none border border-gray-300 h-10 bg-gray-500 rounded-lg py-2 px-4 text-white'
            onClick={handleDeleteMsg} //Delete btn function to clear all the message
            >
             Delete
          </button>
      </div>
    </div>
  );
}
