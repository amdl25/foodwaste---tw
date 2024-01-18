import express from 'express';
import { createProduct, getProduct, getProductId, updateProduct, deleteProduct, getUserProducts } from '../dataAccess/ProductDa.js';
import Product from '../entities/Product.js';
import User from '../entities/User.js';
import { Sequelize } from 'sequelize';

let productRouter = express.Router();

// post for submitting data; get for retrieving data; put for updating data

productRouter.route('/product').post(async (req, res) => {
    res.status(201).json(await createProduct(req.body));
})

productRouter.route('/product').get(async (req, res) => {
    res.status(200).json(await getProduct());
})

productRouter.route('/product/:id').get(async (req, res) => {
    res.status(200).json(await getProductId(req.params.id));
})

productRouter.route('/product/:id').put(async (req,res ) => {
    let ret = await updateProduct(req.params.id, req.body);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

productRouter.route('/product/:id').delete(async (req,res ) => {
    let ret = await deleteProduct(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

productRouter.get('/user/:userEmail/products', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    // Assume you have a function to fetch user products from the database
    const userProducts = await getUserProducts(userEmail);

    res.status(200).json(userProducts);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

productRouter.route('/add-product').post(async (req, res) => {
  const { ProductName, ProductCategory, ProductExpirationDate, ProductQuantity, UserEmail } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('UserEmail')),
        Sequelize.fn('LOWER', UserEmail)
      ),
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Add the product for the user
    const product = await Product.create({
      ProductName,
      ProductCategory,
      ProductExpirationDate,
      ProductIsAvailable: true,
      ProductQuantity,
      UserId: user.UserId,  // Use the retrieved userId
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default productRouter;

// testare requesturi prin postman -> nu mai apelam de 2 ori Get cu ruta create, fiindca daca apelam iar cu force pe true => ni se sterg datele din bd