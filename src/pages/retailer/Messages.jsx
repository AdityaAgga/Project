import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, Grid, Stack, TextField, Button, Divider, Avatar, CircularProgress, Alert, IconButton, Badge, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckIcon from '@mui/icons-material/Check';
import { socketManager } from '../../utils/socket';

const BACKEND_URL = 'http://localhost:5000';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msgLoading, setMsgLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [socketConnected, setSocketConnected] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Connect to WebSocket on mount with improved error handling
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        socketManager.connect(token, BACKEND_URL);
        setSocketConnected(true);
        setSnackbar({ open: true, message: 'Connected to chat server', severity: 'success' });
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to connect to chat server', severity: 'error' });
        setSocketConnected(false);
      }
    }

    return () => {
      if (socketConnected) {
        socketManager.disconnect();
        setSocketConnected(false);
      }
    };
  }, []);

  // Set up WebSocket listeners with improved error handling
  useEffect(() => {
    if (!socketConnected) return;

    const handleNewMessage = (message) => {
      if (activeChat && message.from === activeChat._id) {
        setMessages(prev => [...prev, message]);
        socketManager.markAsRead(activeChat._id);
        
        // Update unread count in conversations list
        setConversations(prev => prev.map(conv => 
          conv._id === message.from 
            ? { ...conv, unreadCount: 0 }
            : conv
        ));
      } else {
        // Update unread count for other conversations
        setConversations(prev => prev.map(conv => 
          conv._id === message.from 
            ? { ...conv, unreadCount: (conv.unreadCount || 0) + 1 }
            : conv
        ));
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

    const handleSocketError = (error) => {
      setSnackbar({ open: true, message: `Socket error: ${error.message}`, severity: 'error' });
      setSocketConnected(false);
    };

    const unsubscribeNewMessage = socketManager.onNewMessage(handleNewMessage);
    const unsubscribeMessageRead = socketManager.onMessageRead(handleMessageRead);
    const unsubscribeFileUploaded = socketManager.onFileUploaded(handleFileUploaded);
    const unsubscribeError = socketManager.onError(handleSocketError);

    return () => {
      unsubscribeNewMessage();
      unsubscribeMessageRead();
      unsubscribeFileUploaded();
      unsubscribeError();
    };
  }, [activeChat, socketConnected]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle scroll position for loading older messages
  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop === 0 && !msgLoading && hasMore) {
      await loadOlderMessages();
    }
  };

  const loadOlderMessages = async () => {
    if (!activeChat || msgLoading || !hasMore) return;
    
    setMsgLoading(true);
    try {
      const oldestMessage = messages[0];
      const res = await fetch(
        `${BACKEND_URL}/api/v1/messages/${activeChat._id}?page=${page}&before=${oldestMessage?._id || ''}`,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to load older messages');
      }
      
      const { messages: olderMessages, hasMore: moreMessages } = await res.json();
      
      if (olderMessages.length > 0) {
        setMessages(prev => [...olderMessages, ...prev]);
        setPage(prev => prev + 1);
      }
      
      setHasMore(moreMessages);
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
        const res = await fetch(`${BACKEND_URL}/api/v1/users`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }
        const users = await res.json();
        
        // Fetch unread counts for each conversation
        const conversationsWithUnread = await Promise.all(
          users.map(async (user) => {
            const unreadRes = await fetch(`${BACKEND_URL}/api/v1/messages/${user._id}/unread`, {
              headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            });
            if (!unreadRes.ok) {
              const errorData = await unreadRes.json();
              throw new Error(errorData.message || 'Failed to fetch unread count');
            }
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
        const res = await fetch(`${BACKEND_URL}/api/v1/messages/${activeChat._id}`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch messages');
        }
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
      const res = await fetch(`${BACKEND_URL}/api/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          content: newMessage,
          to: activeChat._id
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const message = await res.json();
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      socketManager.sendMessage(message);
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
    const formData = new FormData();
    formData.append('file', file);
    formData.append('to', activeChat._id);

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/messages/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to upload file');
      }

      const message = await res.json();
      setMessages(prev => [...prev, message]);
      socketManager.sendMessage(message);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Box maxWidth={1200} mx="auto" px={2}>
        <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', minHeight: 600 }}>
          <Grid container sx={{ height: 600 }}>
            {/* Conversations List */}
            <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #e5e7eb' }, bgcolor: 'grey.50' }}>
              <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">Messages</Typography>
              </Box>
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              <Box sx={{ overflowY: 'auto', height: 540 }}>
                {conversations.map(conversation => (
                  <Box
                    key={conversation._id}
                    sx={{
                      p: 2,
                      borderBottom: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      bgcolor: activeChat?._id === conversation._id ? 'primary.light' : 'inherit',
                      '&:hover': { bgcolor: 'primary.light', opacity: 0.9 }
                    }}
                    onClick={() => setActiveChat(conversation)}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography fontWeight={600} color="text.primary">{conversation.name}</Typography>
                      {conversation.unreadCount > 0 && (
                        <Badge 
                          badgeContent={conversation.unreadCount} 
                          color="primary"
                          sx={{ 
                            '& .MuiBadge-badge': { 
                              fontSize: '0.75rem',
                              height: '20px',
                              minWidth: '20px',
                              borderRadius: '10px'
                            }
                          }}
                        />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>{conversation.email}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            {/* Chat Area */}
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
              {activeChat ? (
                <>
                  <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
                    <Typography fontWeight={600} color="primary">
                      {activeChat.name}
                    </Typography>
                  </Box>
                  <Box 
                    ref={chatContainerRef}
                    onScroll={handleScroll}
                    sx={{ 
                      flex: 1, 
                      overflowY: 'auto', 
                      p: 3, 
                      bgcolor: 'background.default',
                      position: 'relative'
                    }}
                  >
                    {msgLoading && (
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        display: 'flex', 
                        justifyContent: 'center',
                        p: 2
                      }}>
                        <CircularProgress size={24} />
                      </Box>
                    )}
                    {messages.map(message => (
                      <Box
                        key={message._id}
                        sx={{
                          mb: 2,
                          display: 'flex',
                          justifyContent: message.from === activeChat._id ? 'flex-start' : 'flex-end'
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: message.from === activeChat._id ? 'grey.200' : 'primary.main',
                            color: message.from === activeChat._id ? 'text.primary' : '#fff',
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            maxWidth: 320
                          }}
                        >
                          {message.fileUrl ? (
                            <Box>
                              <img 
                                src={message.fileUrl} 
                                alt="Shared file" 
                                style={{ maxWidth: '100%', borderRadius: 8 }}
                              />
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                {message.fileName}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="body2">{message.content}</Typography>
                          )}
                          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </Typography>
                            {message.from !== activeChat._id && (
                              <CheckIcon 
                                fontSize="small" 
                                sx={{ 
                                  color: message.read ? 'primary.main' : 'grey.400',
                                  fontSize: 16 
                                }} 
                              />
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    ))}
                    <div ref={messagesEndRef} />
                  </Box>
                  <Divider />
                  <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                      <IconButton 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingFile}
                      >
                        {uploadingFile ? <CircularProgress size={24} /> : <AttachFileIcon />}
                      </IconButton>
                      <TextField
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        fullWidth
                        size="small"
                        variant="outlined"
                        disabled={sendingMessage}
                      />
                      <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        endIcon={sendingMessage ? <CircularProgress size={20} /> : <SendIcon />}
                        disabled={!newMessage.trim() || sendingMessage || uploadingFile}
                      >
                        Send
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : (
                <Box flex={1} display="flex" alignItems="center" justifyContent="center" color="text.secondary">
                  Select a conversation to start chatting
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages; 