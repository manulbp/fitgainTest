import express from 'express'
import { closeTicket, createTicket, getAllTickets, getTicketTypes, getUserTickets, resolveTicket, startTicketProgress } from '../controllers/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.get('/types',getTicketTypes)
ticketRoutes.post('/create',createTicket)
ticketRoutes.post('/user-tickets', getUserTickets);
ticketRoutes.post('/close', closeTicket);
ticketRoutes.get('/all', getAllTickets);
ticketRoutes.post('/start-progress', startTicketProgress);
ticketRoutes.post('/resolve', resolveTicket);

export default ticketRoutes