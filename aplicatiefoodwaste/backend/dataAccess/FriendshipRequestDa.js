import FriendshipRequest from '../entities/FriendshipRequest.js';
import { validateUserIdAndFriendId, checkExistingFriendship } from '../dataAccess/validations/validationsFriendshipRequest.js';

//se considera validata partea de business logic odata ajuns aici

async function createFriendshipRequest(friendshipRequest) {
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

async function getFriendshipRequest(){
    return await FriendshipRequest.findAll();
}

async function getFriendshipRequestId(id){
    return await FriendshipRequest.findByPk(id);
}

async function updateFriendshipRequest(id, friendshipRequest){
    if(parseInt(id) !== friendshipRequest.FriendshipRequestId)
        return {error: true, msg:"Entity id diff"}

        let updateFR = await getFriendshipRequestId(id); 
        if(!updateFR)
            return {error: true, msg:"No entity found"}
        
        return {error: false, msg: "", obj: await updateFR.update(friendshipRequest)}
}

async function deleteFriendshipRequest(id){
    let deleteFriendshipRequestFR = await getFriendshipRequestId(id); 
    if(!deleteFriendshipRequestFR)
        return {error: true, msg:"No entity found"}

    return {error: false, msg: "", obj: await deleteFriendshipRequestFR.destroy()}
}

//closure - ob cu mai multe functii
export {createFriendshipRequest, getFriendshipRequest, getFriendshipRequestId, updateFriendshipRequest, deleteFriendshipRequest}