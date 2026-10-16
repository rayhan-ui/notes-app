const jwt = require('jsonwebtoken')


const protect = (req, res, next) =>{
    try{
        const auth = req.headers.authorization 
        if(!auth || !auth.startsWith('Bearer ')){
            return res.json({message:"no token, access denied"})
        }

        const token = auth.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()
    }catch(err){
        return res.json({message:"invalid token"})
    }
}

module.exports = protect