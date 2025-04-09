import React, { useState } from 'react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      wholesaler: 'Tech Distributors Inc.',
      lastMessage: 'Your order #1234 has been shipped',
      timestamp: '10:30 AM',
      unread: true
    },
    {
      id: 2,
      wholesaler: 'Fashion Wholesale Co.',
      lastMessage: 'New summer collection available',
      timestamp: 'Yesterday',
      unread: false
    },
    {
      id: 3,
      wholesaler: 'Home Goods Supply',
      lastMessage: 'Special discount on bulk orders',
      timestamp: '2 days ago',
      unread: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'wholesaler',
      content: 'Hello! Your order #1234 has been processed and will be shipped today.',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'retailer',
      content: 'Thank you! When can I expect delivery?',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      sender: 'wholesaler',
      content: 'Delivery is scheduled for tomorrow morning.',
      timestamp: '10:35 AM'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[600px]">
            {/* Conversations List */}
            <div className="w-1/3 border-r">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
              </div>
              <div className="overflow-y-auto h-full">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      activeChat === conversation.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setActiveChat(conversation.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{conversation.wholesaler}</h3>
                      <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{conversation.lastMessage}</p>
                    {conversation.unread && (
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col">
              {activeChat ? (
                <>
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-800">
                      {conversations.find(c => c.id === activeChat)?.wholesaler}
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`mb-4 ${
                          message.sender === 'retailer' ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            message.sender === 'retailer'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          <p>{message.content}</p>
                          <span className="text-xs opacity-75 mt-1 block">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages; 