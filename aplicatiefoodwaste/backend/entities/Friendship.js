import { Sequelize } from 'sequelize';
import db from '../dbConfig.js';

const Friendship = db.define("Friendship", {
    FriendshipId: {
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

export default Friendship;