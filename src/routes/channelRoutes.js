import express from 'express';
import ChannelController from '../controllers/channelController.js';

const channelRouter = express.Router();

channelRouter.get('/', ChannelController.getAllChannel);

channelRouter.post('/', ChannelController.createChannel);



export default channelRouter;
