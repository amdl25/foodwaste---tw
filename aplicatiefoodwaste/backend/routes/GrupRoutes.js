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
grupRouter.get('/usersInGroups', async (req, res) => {
  try {
    const usersInGroups = await User.findAll({
      include: [
        {
          model: Grup,

        },
      ],
    });

    const formattedUsersInGroups = usersInGroups.map((user) => ({
      UserId: user.UserId,
      UserEmail: user.UserEmail, // Assuming the user model has an 'email' field
      groups: user.Grups.map((grup) => grup.GrupName), // Adjust the field based on your Grup model
    }));

    res.json(formattedUsersInGroups);
  } catch (error) {
    console.error('Error fetching users in groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


grupRouter.route('/grup/:id').delete(async (req,res ) => {
    let ret = await deleteGrup(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

grupRouter.route('/add-to-group').post(async (req, res) => {
  const { UserEmail, GrupName } = req.body;

  try {
    // Check if the User exists
    const user = await User.findOne({ where: { UserEmail: UserEmail } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if the Grup exists with that name
    const grup = await Grup.findOne({
      where: {
        GrupName: GrupName,
      },
    });

    if (!grup) {
      // If the Grup doesn't exist, it is created
      const newGrup = await Grup.create({ GrupName: GrupName });
      await user.addGrup(newGrup);
      res.status(200).json({ message: 'User added to Grup successfully' });
    } else {
      // Check if the user is already a member of the group
      const isMember = await user.hasGrup(grup);
      if (isMember) {
        res.status(400).json({ error: 'User is already a member of the group' });
      } else {
        await user.addGrup(grup);
        res.status(200).json({ message: 'User added to Grup successfully' });
      }
    }
  } catch (error) {
    console.error('Error adding user to Grup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  

export default grupRouter;

// testare requesturi prin postman -> nu mai apelam de 2 ori Get cu ruta create, fiindca daca apelam iar cu force pe true => ni se sterg datele din bd