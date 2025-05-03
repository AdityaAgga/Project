import { io } from 'socket.io-client';

class SocketManager {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
    this.readReceiptHandlers = new Set();
    this.fileHandlers = new Set();
    this.errorHandlers = new Set();
  }

  connect(token, backendUrl = 'http://localhost:5000') {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(backendUrl, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.errorHandlers.forEach(handler => handler({
        type: 'connection',
        message: 'Failed to connect to chat server'
      }));
    });

    this.socket.on('newMessage', (message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });

    this.socket.on('messageRead', (data) => {
      this.readReceiptHandlers.forEach(handler => handler(data));
    });

    this.socket.on('fileUploaded', (data) => {
      this.fileHandlers.forEach(handler => handler(data));
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.errorHandlers.forEach(handler => handler({
        type: 'general',
        message: error.message || 'An error occurred in the chat'
      }));
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try to reconnect
        this.socket.connect();
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.messageHandlers.clear();
      this.readReceiptHandlers.clear();
      this.fileHandlers.clear();
      this.errorHandlers.clear();
    }
  }

  sendMessage(message) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return false;
    }
    this.socket.emit('sendMessage', message);
    return true;
  }

  markAsRead(conversationId) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return false;
    }
    this.socket.emit('markAsRead', { conversationId });
    return true;
  }

  uploadFile(file, conversationId) {
    if (!this.socket) return;
    this.socket.emit('uploadFile', { file, conversationId });
  }

  onNewMessage(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onMessageRead(handler) {
    this.readReceiptHandlers.add(handler);
    return () => this.readReceiptHandlers.delete(handler);
  }

  onFileUploaded(handler) {
    this.fileHandlers.add(handler);
    return () => this.fileHandlers.delete(handler);
  }

  onError(handler) {
    this.errorHandlers.add(handler);
    return () => this.errorHandlers.delete(handler);
  }
}

export const socketManager = new SocketManager(); 