import { Sequelize } from 'sequelize';
import db from '../dbConfig.js';

const Grup = db.define("Grup", {
    GrupId: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    }, 
    GrupName: {
        type: Sequelize.STRING, 
        allowNull: false, 
    }, 
})

export default Grup;