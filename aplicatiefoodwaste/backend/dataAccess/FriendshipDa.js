import Friendship from '../entities/Friendship.js';
import { validateUserIdAndFriendId, checkExistingFriendship } from '../dataAccess/validations/validationsFriendshipRequest.js';
import {Op} from 'sequelize';
import User from '../entities/User.js';
//se considera validata partea de business logic odata ajuns aici

async function createFriendship(userId, friendId) {
  const userIdAndFriendIdValidation = validateUserIdAndFriendId(userId, friendId);

  if (userIdAndFriendIdValidation.error) {
    return userIdAndFriendIdValidation;
  }

  const existingFriendshipCheck = await checkExistingFriendship(userId, friendId, Friendship);

  if (existingFriendshipCheck.error) {
    return existingFriendshipCheck;
  }

  try {
    const newFriendship = await Friendship.create({ userId, friendId});
    return { error: false, msg: 'Friendship added successfully.', obj: newFriendship };
  } catch (error) {
    return { error: true, msg: `Error adding friendship: ${error.message}` };
  }
}

async function getFriendship(){
    return await Friendship.findAll();
}

async function getFriendshipId(id){
    return await Friendship.findByPk(id);
}

async function updateFriendship(id, friendship){
    if(parseInt(id) !== friendship.FriendshipId)
        return {error: true, msg:"Entity id diff"}

        let updateF = await getFriendshipId(id); 
        if(!updateF)
            return {error: true, msg:"No entity found"}
        
        return {error: false, msg: "", obj: await updateF.update(friendship)}
}

async function deleteFriendship(id){
    let deleteFriendshipF = await getFriendshipId(id); 
    if(!deleteFriendshipF)
        return {error: true, msg:"No entity found"}

    return {error: false, msg: "", obj: await deleteFriendshipF.destroy()}
}

async function getFriendsList(userEmail) {
  try {
    // Find the user based on userEmail
    const user = await User.findOne({
      where: {
        UserEmail: userEmail,
      },
    });

    if (!user) {
      return []; // User not found, return an empty array or handle accordingly
    }

    // Fetch friendships where either the user is the userId or the friendId
    const friendsList = await Friendship.findAll({
      where: {
        [Op.or]: [
          { senderId: user.UserId },
          { receiverId: user.UserId },
        ],
      },
      include: [
        // Include additional attributes as needed
        {
          model: User,
          as: 'Sender',
          attributes: ['UserId', 'UserEmail'],
        },
        {
          model: User,
          as: 'Receiver',
          attributes: ['UserId', 'UserEmail'],
        },
      ],
    });

    return friendsList;
  } catch (error) {
    console.error('Error fetching friends list:', error);
    throw error; // Handle the error appropriately
  }
}
//closure - ob cu mai multe functii
export {createFriendship, getFriendship, getFriendshipId, updateFriendship, deleteFriendship, getFriendsList}