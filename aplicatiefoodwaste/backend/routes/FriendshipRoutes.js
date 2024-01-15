import express from 'express';
import { createFriendship, getFriendship, getFriendshipId, updateFriendship, deleteFriendship } from '../dataAccess/FriendshipDa.js';
import Friendship from '../entities/Friendship.js';
import FriendshipRequest from '../entities/FriendshipRequest.js';
import { Sequelize } from 'sequelize';


let friendshipRouter = express.Router();

// post for submitting data; get for retrieving data; put for updating data

friendshipRouter.route('/friendship').post(async (req, res) => {
    res.status(201).json(await createFriendship(req.body));
})

friendshipRouter.route('/friendship').get(async (req, res) => {
    res.status(200).json(await getFriendship());
})

friendshipRouter.route('/friendship/:id').get(async (req, res) => {
    res.status(200).json(await getFriendshipId(req.params.id));
})

friendshipRouter.route('/friendship/:id').put(async (req,res ) => {
    let ret = await updateFriendship(req.params.id, req.body);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

friendshipRouter.route('/friendship/:id').delete(async (req,res ) => {
    let ret = await deleteFriendship(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})


friendshipRouter.route('/accept-friend-request/:friendRequestId').post(async (req, res) => {
  const { FriendshipRequestId } = req.body;

  try {
    // Find the friend request
    const friendRequest = await FriendshipRequest.findByPk(FriendshipRequestId);

    console.log(friendRequest);
    if (!friendRequest) {
      res.status(404).json({ error: 'Friend request not found' });
      return;
    }

    // Check if a friendship already exists between the users
    const existingFriendship = await Friendship.findOne({
      where: {
        [Sequelize.Op.or]: [
          { senderId: friendRequest.senderId, receiverId: friendRequest.receiverId },
          { senderId: friendRequest.receiverId, receiverId: friendRequest.senderId },
        ],
      },
    });

    if (existingFriendship) {
      res.status(400).json({ error: 'Friendship already exists' });
      return;
    }

    // Create a friendship
    await Friendship.create({
      senderId: friendRequest.senderId,
      receiverId: friendRequest.receiverId,
    });

    // Delete the friend request
    await friendRequest.destroy();

    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default friendshipRouter;

// testare requesturi prin postman -> nu mai apelam de 2 ori Get cu ruta create, fiindca daca apelam iar cu force pe true => ni se sterg datele din bd