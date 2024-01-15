import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import User from "./User.js";
import Product from "./Product.js";
import Grup from './Grup.js'
import Friendship from './Friendship.js';
import FriendshipRequest from './FriendshipRequest.js';
import db from '../dbConfig.js';

env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}

function FK_Config(){

   Product.belongsTo(User, {foreignKey: 'UserId'});
   User.hasMany(Product, {foreignKey: 'UserId'});

   User.belongsToMany(Grup, {through: "GrupUser", foreignKey: "UserId"});
   Grup.belongsToMany(User, {through:"GrupUser", foreignKey:"GrupId"});

   Friendship.belongsTo(User, { foreignKey: 'senderId', targetKey: "UserId", as: 'Sender' });
   Friendship.belongsTo(User, { foreignKey: 'receiverId', targetKey: "UserId", as: 'Receiver' });

   FriendshipRequest.belongsTo(User, { foreignKey: 'senderId', targetKey: "UserId", as: 'SenderRequest' });
   FriendshipRequest.belongsTo(User, { foreignKey: 'receiverId', targetKey: "UserId", as: 'ReceiverRequest'});

}

function DB_Init(){
    Create_DB();
    FK_Config();
    db.sync({force:false});

}

export default DB_Init;