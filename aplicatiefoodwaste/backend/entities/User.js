import { Sequelize } from 'sequelize';
import db from '../dbConfig.js';

const User = db.define("User", {
    UserId: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    }, 
    UserFirstName: {
        type: Sequelize.STRING, 
        allowNull: false, 

    }, 
    UserLastName: {
        type: Sequelize.STRING, 
        allowNull: false, 

    }, 
    UserEmail: {
        type: Sequelize.STRING,
        allowNull: true
    },

    UserPassword: {
        type: Sequelize.STRING, 
        allowNull: false
    }
})


export default User;