import Friendship from '../entities/Friendship.js';
import { validateUserIdAndFriendId, checkExistingFriendship } from '../dataAccess/validations/validationsFriendshipRequest.js';

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

//closure - ob cu mai multe functii
export {createFriendship, getFriendship, getFriendshipId, updateFriendship, deleteFriendship}