import Product from '../entities/Product.js';
import {Op,literal} from 'sequelize';
import { Sequelize } from 'sequelize';
import {format} from 'date-fns';
import moment from 'moment';
import User from '../entities/User.js';

//se considera validata partea de business logic odata ajuns aici
async function createProduct(product){
    return await Product.create(product);
}

async function getProduct(){
    const currentDate = new Date();
    const products = await Product.findAll({
        where: {
            ProductExpirationDate : {
                [Op.lt]: literal('CURRENT_DATE + INTERVAL 7 DAY'),
            },
        },
    });
    return products;
}

async function getProductId(id){
    return await Product.findByPk(id);
}

async function updateProduct(id, product){
    if(parseInt(id) !== product.ProductId)
        return {error: true, msg:"Entity id diff"}

        let updateP = await getProductId(id); 
        if(!updateP)
            return {error: true, msg:"No entity found"}
        
        return {error: false, msg: "", obj: await updateP.update(product)}
}

async function deleteProduct(id){
    let deleteProductP = await getProductId(id); 
    if(!deleteProductP)
        return {error: true, msg:"No entity found"}

    return {error: false, msg: "", obj: await deleteProductP.destroy()}
}

async function getUserProducts(email){

    try {
        // Find the user based on the provided email
        const user = await User.findOne({
          where: {
            UserEmail: email,
          },
        });
    
        if (!user) {
          // Handle case where user is not found
          return [];
        }
    
        // Find all products associated with the user
        const userProducts = await Product.findAll({
          where: {
            UserId: user.UserId,
          },
        });
    
        return userProducts;
      } catch (error) {
        console.error('Error fetching user products:', error);
        throw error;
      }
}

//closure - ob cu mai multe functii
export {createProduct, getProduct, getProductId, updateProduct, deleteProduct, getUserProducts}