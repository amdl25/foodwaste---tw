import { Sequelize } from 'sequelize';
import db from '../dbConfig.js';

const FriendshipRequest = db.define("FriendshipRequest", {
    FriendshipRequestId: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    }, 
    senderId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
    }, 

    receiverId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
    }, 

})

export default FriendshipRequest;