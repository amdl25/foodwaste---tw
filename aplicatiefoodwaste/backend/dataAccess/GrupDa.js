import Grup from '../entities/Grup.js';

//se considera validata partea de business logic odata ajuns aici
async function createGrup(grup){
    return await Grup.create(grup);
}

async function getGrup(){
    return await Grup.findAll();
}

async function getGrupId(id){
    return await Grup.findByPk(id);
}

async function updateGrup(id, grup){
    if(parseInt(id) !== group.GrupId)
        return {error: true, msg:"Entity id diff"}

        let updateG = await getGrupId(id); 
        if(!updateG)
            return {error: true, msg:"No entity found"}
        
        return {error: false, msg: "", obj: await updateG.update(grup)}
}

async function deleteGrup(id){
    let deleteGrupG = await getGrupId(id); 
    if(!deleteGrupG)
        return {error: true, msg:"No entity found"}

    return {error: false, msg: "", obj: await deleteGrupG.destroy()}
}

//closure - ob cu mai multe functii
export {createGrup, getGrup, getGrupId, updateGrup, deleteGrup}