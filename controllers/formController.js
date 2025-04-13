const formmodel = require('../models/form')
// function to create a form
const createform = async(req,res)=>{
try {
    const{title,description,questions} = req.body
    const userId = req.user;
    const newForm = new formmodel({
        title,
        description,
        questions,
        createdby:userId

    })
    await newForm.save();
    return res.status(201).send(
        {message:'succesfully created form',
            formId: newForm._id
        }
        

    )
} catch (error) {
    console.error(error);
    return res.status(500).send({message:' error creating form'})
}
}


// function to get a form

const getform = async(req,res)=>{
    const { formId } = req.params;

    try {
        const form = await formmodel.findById(formId).populate('questions');
        if(!form){
            return res.status(404).send({message:'no form found!'})
        }
        return res.json(form)
    } catch (error) {
        console.error(error);
        return res.status(500).send({message:'error getting the form!'})
    }
}


module.exports = {createform,getform}