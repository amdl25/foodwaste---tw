import express from 'express';
import { createGrup, getGrup, getGrupId, updateGrup, deleteGrup } from '../dataAccess/GrupDa.js';
import User from '../entities/User.js';
import Grup from '../entities/Grup.js';
import { Sequelize } from 'sequelize';

let grupRouter = express.Router();

// post for submitting data; get for retrieving data; put for updating data

grupRouter.route('/grup').post(async (req, res) => {
    res.status(201).json(await createGrup(req.body));
})

grupRouter.route('/grup').get(async (req, res) => {
    res.status(200).json(await getGrup());
})

grupRouter.route('/grup/:id').get(async (req, res) => {
    res.status(200).json(await getGrupId(req.params.id));
})

grupRouter.route('/grup/:id').put(async (req,res ) => {
    let ret = await updateGrup(req.params.id, req.body);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

grupRouter.route('/grup/:id').delete(async (req,res ) => {
    let ret = await deleteGrup(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

grupRouter.route('/add-to-group').post(async (req, res) => {
    const { UserId, GrupName } = req.body;
  
    try {
      // Check if the User exists
      const user = await User.findByPk(UserId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

    // Check if the Friend exists
    const friend = await User.findByPk(friendId);
    if (!friend) {
      res.status(404).json({ error: 'Friend not found' });
      return;
    }

    // Check if there is a friendship between the User and the Friend
    const friendship = await Friendship.findOne({
      where: {
        [Sequelize.Op.or]: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      },
    });

    if (!friendship) {
      res.status(400).json({ error: 'Invalid friend or not a friend' });
      return;
    }

  
      // Check if the Grup exists with that name
      const grup = await Grup.findOne({
        where: {
            GrupName: GrupName
        }

      });
  
      // If the Grup doesn't exist, it is created
    if (!grup) {
        const newGrup = await Grup.create({ GrupName: groupName });
        await user.addGrup(newGrup);
      } else {
        await user.addGrup(grup);
      }
  
      res.status(200).json({ message: 'User added to Grup successfully' });
    } catch (error) {
      console.error('Error adding user to Grup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default grupRouter;

// testare requesturi prin postman -> nu mai apelam de 2 ori Get cu ruta create, fiindca daca apelam iar cu force pe true => ni se sterg datele din bd