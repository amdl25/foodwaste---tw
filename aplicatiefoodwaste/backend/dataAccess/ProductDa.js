import Product from '../entities/Product.js';

//se considera validata partea de business logic odata ajuns aici
async function createProduct(product){
    return await Product.create(product);
}

async function getProduct(){
    return await Product.findAll();
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

//closure - ob cu mai multe functii
export {createProduct, getProduct, getProductId, updateProduct, deleteProduct}