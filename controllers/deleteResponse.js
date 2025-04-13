/** @type {import('mongoose').Model} */
const Response = require('../models/response')

const deleteResponse = async(req,res)=>{
    const {responseId} = req.params;
    try {
        const response = await Response.findByIdAndDelete(responseId);

        if(!response){
            return res.status(404).send({message:'response you want to delete, not found!'})
        }
        return res.status(200).send({message:'Response deleted succesfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).send({message:'error deleting response!'})
    }
}
module.exports = {deleteResponse}