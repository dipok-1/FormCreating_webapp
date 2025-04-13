const jwt = require('jsonwebtoken')
const protect  = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded.id
            next();
         } catch (error) {
            console.error(error)
            res.status(401).send({message:'invalid token'})
         }
    }else{
        res.status(401).send({message:'no token is found!'})
    }
     
}
module.exports = protect