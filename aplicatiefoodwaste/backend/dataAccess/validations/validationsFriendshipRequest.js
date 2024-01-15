function validateUserIdAndFriendId(userId, friendId) {
    if (userId === friendId) {
      return { error: true, msg: 'UserId and FriendId must be different.' };
    }
  
    return { error: false, msg: '' };
  }
  
  async function checkExistingFriendship(userId, friendId, Friendship) {
    try {
      const existingFriendship = await Friendship.findOne({
        where: {
          $or: [
            { userId, friendId },
            { userId: friendId, friendId: userId }
          ]
        }
      });
  
      if (existingFriendship) {
        return { error: true, msg: 'Friendship already exists.' };
      }
  
      return { error: false, msg: '' };
    } catch (error) {
      return { error: true, msg: `Error checking existing friendship: ${error.message}` };
    }
  }
  
  export { validateUserIdAndFriendId, checkExistingFriendship };