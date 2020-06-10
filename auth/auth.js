const jwt = require('jsonwebtoken');

module.exports = (req , res , next) =>{
       
    const authHeader = req.get('Authorization');
    
    if(!authHeader){
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }

    isValidToken = jwt.verify(token , 'SECRETEKEY');

    if(!isValidToken){
        req.isAuth = false;
        return next();
    }

    req.userId = token.userId;
    req.isAuth = true;
    next();
}

