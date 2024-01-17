import express from 'express';
import { createFriendshipRequest, getFriendshipRequest, getFriendshipRequestId, updateFriendshipRequest, deleteFriendshipRequest } from '../dataAccess/FriendshipRequestDa.js';
import User from '../entities/User.js'
import FriendshipRequest from '../entities/FriendshipRequest.js';
import { Sequelize } from 'sequelize';

let friendshipRequestRouter = express.Router();

// post for submitting data; get for retrieving data; put for updating data

friendshipRequestRouter.route('/friendshipRequest').post(async (req, res) => {
    res.status(201).json(await createFriendshipRequest(req.body));
})

friendshipRequestRouter.route('/friendshipRequest').get(async (req, res) => {
    res.status(200).json(await getFriendshipRequest());
})


friendshipRequestRouter.route('/friendshipRequest/:id').get(async (req, res) => {
    res.status(200).json(await getFriendshipRequestId(req.params.id));
})

friendshipRequestRouter.route('/friendshipRequest/:id').put(async (req,res ) => {
    let ret = await updateFriendshipRequest(req.params.id, req.body);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

friendshipRequestRouter.route('/friendshipRequest/:id').delete(async (req,res ) => {
    let ret = await deleteFriendshipRequest(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

});


friendshipRequestRouter.route('/send-request').post(async (req, res) => {
  const { senderEmail, receiverEmail } = req.body;

  try {
    // Check if sender and recipient users exist
    const [senderUser, recipientUser] = await Promise.all([
      User.findOne({ where: { UserEmail: senderEmail } }),
      User.findOne({ where: { UserEmail: receiverEmail } }),
    ]);

    if (!senderUser || !recipientUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if the friendship already exists
    const existingFriendshipRequest = await FriendshipRequest.findOne({
      where: {
        [Sequelize.Op.or]: [
          { senderId: senderUser.UserId, receiverId: recipientUser.UserId },
          { senderId: recipientUser.UserId, receiverId: senderUser.UserId },
        ],
      },
    });

    if (existingFriendshipRequest) {
      res.status(400).json({ error: 'Friendship request already exists' });
      return;
    }

    // Create a friendship request
    const friendshiprequest = await FriendshipRequest.create({
      senderId: senderUser.UserId,
      receiverId: recipientUser.UserId,
    });

    res.status(201).json({ message: 'Friendship request sent successfully', friendshiprequest });
  } catch (error) {
    console.error('Error creating friendship request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// friendshipRequestRouter.js
friendshipRequestRouter.route('/friendshipRequest/:email').get(async (req, res) => {
  const { email } = req.params;

  try {
    const senderUser = await User.findOne({ where: { UserEmail: email } });

    if (!senderUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const friends = await FriendshipRequest.findAll({
      where: {
        [Sequelize.Op.or]: [
          { senderId: senderUser.UserId },
          { receiverId: senderUser.UserId },
        ],
      },
    });

    res.status(200).json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

friendshipRequestRouter.route('/friendshipRequest/list').get(async (req, res) => {
  //const { QueryTypes } = require('sequelize');
  try {
    const friendshipRequests = await User.findAll({
      where: {
        UserId: senderId,

      },
      include: {
        model: FriendshipRequest,
        as: "SenderRequest"
      },
      raw: true
    })
    res.status(200).json(friendshipRequests);
  }catch (error) {
    console.error('Error fetching friendship requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default friendshipRequestRouter;


// testare requesturi prin postman -> nu mai apelam de 2 ori Get cu ruta create, fiindca daca apelam iar cu force pe true => ni se sterg datele din bd