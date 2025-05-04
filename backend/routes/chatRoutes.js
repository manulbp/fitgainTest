import express from 'express';
import { getUserChat, getAllChats, getChatMessages, sendMessage, updateMessageStatus, getUnreadMessages, deleteChat } from '../controllers/chatController.js';

const chatRoutes = express.Router();

chatRoutes.post('/user-chat', getUserChat);
chatRoutes.get('/all-chats', getAllChats);
chatRoutes.get('/messages', getChatMessages);
chatRoutes.post('/send', sendMessage);
chatRoutes.post('/message/status', updateMessageStatus);
chatRoutes.post('/unread', getUnreadMessages);
chatRoutes.post('/delete', deleteChat);

export default chatRoutes;