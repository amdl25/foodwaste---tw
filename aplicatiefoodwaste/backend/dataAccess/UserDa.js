import User from '../entities/User.js';

//se considera validata partea de business logic odata ajuns aici
async function createUser(user){
    return await User.create(user);
}

async function getUser(){
    return await User.findAll();
}

async function getUserByEmail(email) {
    return await User.findOne({
      where: {
        UserEmail: email,
      },
    });
  }

async function updateUser(id, user){
    if(parseInt(id) !== user.UserId)
        return {error: true, msg:"Entity id diff"}

        let updateU = await getUserId(id); 
        if(!updateU)
            return {error: true, msg:"No entity found"}
        
        return {error: false, msg: "", obj: await updateU.update(user)}
}

async function deleteUser(id){
    let deleteUserU = await getUserId(id); 
    if(!deleteUserU)
        return {error: true, msg:"No entity found"}
    return {error: false, msg: "", obj: await deleteUserU.destroy()}
}

//closure - ob cu mai multe functii
export {createUser, getUser, getUserByEmail, updateUser, deleteUser}