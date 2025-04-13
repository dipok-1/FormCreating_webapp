/** @type {import('mongoose').Model} */
const Response = require('../models/response');
const showresponse = async(req,res)=>{
    const {formId}= req.params;
    try {
        const responses = await Response.find({formId})
        if(!responses.length){
            return res.status(404).send({message:'response not found for the form!'})
        }
        return res.status(200).send(responses)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'error fetching response'})
    }
}
module.exports = {showresponse};