import { Sequelize } from 'sequelize';
import db from '../dbConfig.js';

const Product = db.define("Product", {
    ProductId: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    }, 
    ProductName: {
        type: Sequelize.STRING, 
        allowNull: false, 
    }, 
    ProductCategory: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    ProductExpirationDate: {
        type: Sequelize.DATE, 
        allowNull: false
    },
    ProductIsAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    ProductQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    UserId: {
        type: Sequelize.INTEGER, 
        allowNull: false
    }
})

export default Product;