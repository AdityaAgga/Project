import React, { useState } from 'react';
import './Messages.css';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Thanks for the update!',
      time: '10:30 AM',
      unread: 2
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'Can we schedule a meeting?',
      time: 'Yesterday',
      unread: 0
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lastMessage: 'The order has been shipped',
      time: '2 days ago',
      unread: 0
    }
  ];

  // Sample messages data
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hello, how can I help you today?',
      time: '10:00 AM',
      isSent: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'I have a question about my order',
      time: '10:05 AM',
      isSent: true
    },
    {
      id: 3,
      sender: 'John Doe',
      content: 'Sure, what would you like to know?',
      time: '10:10 AM',
      isSent: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="messages-container">
      <h1 className="messages-header">Messages</h1>
      <div className="messages-content">
        {/* Chat List */}
        <div className="chat-list">
          <div className="chat-search">
            <input
              type="text"
              placeholder="Search messages..."
              className="search-input"
            />
          </div>
          <div className="chat-list-content">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="chat-header">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <p className="chat-preview">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="unread-badge">{chat.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.isSent ? 'sent' : 'received'}`}
              >
                <div className="message-content">{msg.content}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>
          <div className="message-input">
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input-field"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages; 