import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Stack, 
  TextField, 
  Button, 
  IconButton, 
  Avatar, 
  CircularProgress, 
  Alert, 
  Badge, 
  Snackbar,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  InsertEmoticon as EmojiIcon
} from '@mui/icons-material';
import { socketManager } from '../../utils/socket';

const Messages = () => {
  const theme = useTheme();
  const [conversations, setConversations] = useState([
    {
      _id: '1',
      name: 'Retail Store One',
      email: 'retail1@example.com',
      unreadCount: 2,
      lastMessage: 'Regarding bulk order inquiry',
      lastMessageTime: '10:30 AM'
    },
    {
      _id: '2',
      name: 'Super Mart',
      email: 'supermart@example.com',
      unreadCount: 0,
      lastMessage: 'Order #1234 has been delivered',
      lastMessageTime: 'Yesterday'
    },
    {
      _id: '3',
      name: 'Quick Shop',
      email: 'quickshop@example.com',
      unreadCount: 5,
      lastMessage: 'Need urgent restock of products',
      lastMessageTime: '2 days ago'
    },
    {
      _id: '4',
      name: 'City Retail',
      email: 'cityretail@example.com',
      unreadCount: 0,
      lastMessage: 'Thank you for the quick delivery',
      lastMessageTime: '3 days ago'
    },
    {
      _id: '5',
      name: 'Mega Store',
      email: 'megastore@example.com',
      unreadCount: 1,
      lastMessage: 'Can we discuss bulk pricing?',
      lastMessageTime: 'Last week'
    }
  ]);

  const [messages, setMessages] = useState([
    {
      _id: '1',
      content: 'Hello, I would like to inquire about bulk pricing for your products.',
      from: '1',
      timestamp: '2024-04-28T10:30:00Z',
      read: true
    },
    {
      _id: '2',
      content: 'Sure, I can provide you with our wholesale pricing. Which products are you interested in?',
      from: 'self',
      timestamp: '2024-04-28T10:32:00Z',
      read: true
    },
    {
      _id: '3',
      content: 'I\'m particularly interested in your electronics category. Can you share the catalog?',
      from: '1',
      timestamp: '2024-04-28T10:35:00Z',
      read: true
    },
    {
      _id: '4',
      content: 'Here\'s our latest electronics catalog. Let me know if you need any specific details.',
      from: 'self',
      timestamp: '2024-04-28T10:37:00Z',
      read: true
    },
    {
      _id: '5',
      content: 'Thank you! I\'ll review it and get back to you with the quantities.',
      from: '1',
      timestamp: '2024-04-28T10:40:00Z',
      read: false
    }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msgLoading, setMsgLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Connect to WebSocket on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socketManager.connect(token);
    }

    return () => {
      socketManager.disconnect();
    };
  }, []);

  // Set up WebSocket listeners
  useEffect(() => {
    const handleNewMessage = (message) => {
      if (activeChat && message.from === activeChat._id) {
        setMessages(prev => [...prev, message]);
        socketManager.markAsRead(activeChat._id);
      }
    };

    const handleMessageRead = (data) => {
      if (data.conversationId === activeChat?._id) {
        setMessages(prev => prev.map(msg => 
          msg._id === data.messageId ? { ...msg, read: true } : msg
        ));
      }
    };

    const handleFileUploaded = (data) => {
      if (activeChat && data.conversationId === activeChat._id) {
        setMessages(prev => [...prev, data.message]);
      }
    };

    const unsubscribeNewMessage = socketManager.onNewMessage(handleNewMessage);
    const unsubscribeMessageRead = socketManager.onMessageRead(handleMessageRead);
    const unsubscribeFileUploaded = socketManager.onFileUploaded(handleFileUploaded);

    return () => {
      unsubscribeNewMessage();
      unsubscribeMessageRead();
      unsubscribeFileUploaded();
    };
  }, [activeChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle scroll position for loading older messages
  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && !msgLoading) {
      // Load older messages when scrolled to top
      loadOlderMessages();
    }
  };

  const loadOlderMessages = async () => {
    if (!activeChat || msgLoading) return;
    setMsgLoading(true);
    try {
      const oldestMessage = messages[0];
      const res = await fetch(`/api/v1/messages/${activeChat._id}?before=${oldestMessage._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) throw new Error('Failed to load older messages');
      const olderMessages = await res.json();
      setMessages(prev => [...olderMessages, ...prev]);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setMsgLoading(false);
    }
  };

  // Fetch conversation list with unread counts
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/v1/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const users = await res.json();
        
        // Fetch unread counts for each conversation
        const conversationsWithUnread = await Promise.all(
          users.map(async (user) => {
            const unreadRes = await fetch(`/api/v1/messages/${user._id}/unread`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const { count } = await unreadRes.json();
            return { ...user, unreadCount: count };
          })
        );
        
        setConversations(conversationsWithUnread);
      } catch (err) {
        setSnackbar({ open: true, message: err.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!activeChat) return;
    const fetchMessages = async () => {
      setMsgLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/v1/messages/${activeChat._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch messages');
        const msgs = await res.json();
        setMessages(msgs);
        socketManager.markAsRead(activeChat._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setMsgLoading(false);
      }
    };
    fetchMessages();
  }, [activeChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || sendingMessage) return;
    
    setSendingMessage(true);
    try {
      const res = await fetch('/api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ to: activeChat._id, content: newMessage })
      });
      if (!res.ok) throw new Error('Failed to send message');
      const msg = await res.json();
      setMessages(prev => [...prev, msg]);
      socketManager.sendMessage(msg);
      setNewMessage('');
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setSendingMessage(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat || uploadingFile) return;

    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('to', activeChat._id);

      const res = await fetch('/api/v1/messages/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!res.ok) throw new Error('Failed to upload file');
      const data = await res.json();
      setMessages(prev => [...prev, data]);
      socketManager.uploadFile(file, activeChat._id);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setUploadingFile(false);
      e.target.value = '';
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        height: 'calc(100vh - 64px)',
        pt: '64px',
        bgcolor: 'background.default'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          width: '100%',
          maxWidth: '1600px',
          mx: 'auto',
          p: 2,
          gap: 2
        }}
      >
        {/* Left Panel - Conversations */}
        <Paper 
          sx={{ 
            width: 320,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" color="primary" fontWeight={600}>
              Messages
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ 
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <Box sx={{ overflow: 'auto', flex: 1 }}>
            {conversations.map(conversation => (
              <Box
                key={conversation._id}
                onClick={() => setActiveChat(conversation)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: activeChat?._id === conversation._id ? 'primary.light' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: activeChat?._id === conversation._id ? 'primary.main' : 'grey.400',
                      width: 40,
                      height: 40
                    }}
                  >
                    {conversation.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle2" noWrap>
                        {conversation.name}
                      </Typography>
                      {conversation.unreadCount > 0 && (
                        <Badge 
                          badgeContent={conversation.unreadCount} 
                          color="primary"
                          sx={{ 
                            '& .MuiBadge-badge': {
                              fontSize: 11,
                              minWidth: 18,
                              height: 18
                            }
                          }}
                        />
                      )}
                    </Stack>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      noWrap 
                      sx={{ mt: 0.5 }}
                    >
                      {conversation.lastMessage}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {conversation.lastMessageTime}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Right Panel - Chat */}
        <Paper 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          {activeChat ? (
            <>
              {/* Chat Header */}
              <Box 
                sx={{ 
                  p: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {activeChat.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {activeChat.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activeChat.email}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Messages Area */}
              <Box 
                ref={chatContainerRef}
                onScroll={handleScroll}
                sx={{ 
                  flex: 1,
                  overflow: 'auto',
                  p: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50'
                }}
              >
                {messages.map(message => (
                  <Box
                    key={message._id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.from === activeChat._id ? 'flex-start' : 'flex-end',
                      mb: 1.5
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        bgcolor: message.from === activeChat._id 
                          ? theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100'
                          : 'primary.main',
                        color: message.from === activeChat._id ? 'text.primary' : 'white',
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        position: 'relative'
                      }}
                    >
                      <Typography variant="body2">
                        {message.content}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block',
                          textAlign: 'right',
                          mt: 0.5,
                          opacity: 0.7
                        }}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Message Input */}
              <Box 
                component="form" 
                onSubmit={handleSendMessage}
                sx={{ 
                  p: 2,
                  borderTop: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  gap: 1
                }}
              >
                <IconButton 
                  size="small"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <AttachFileIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <EmojiIcon fontSize="small" />
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!newMessage.trim() || sendingMessage}
                  endIcon={sendingMessage ? <CircularProgress size={16} /> : <SendIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages; 