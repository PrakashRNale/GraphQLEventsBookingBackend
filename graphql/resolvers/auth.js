const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/user');


module.exports = {
    createUser : (args) =>{
        return User.findOne({email : args.userInput.email}).then(user =>{
            if(user){
                throw new Error('User already exists');
            }
            return bcrypt.hash(args.userInput.password , 12)
        }).then(hashedPassword =>{
            const user = new User({
                email : args.userInput.email,
                password : hashedPassword,
                name : args.userInput.name
            })

            return user.save()
        }).then(user=>{
            return {
                ...user._doc,
                _id : user._doc._id,
                password : null
            }
        }).catch(err => {
            console.log(err);
        })
    },

    login : (args) =>{
        let existingUser;
        return User.findOne({email : args.email}).then(user=>{
            console.log(user);
            if(!user){
                throw new Error('No user found');
            }
            existingUser = user._doc;
            return bcrypt.compare(args.password , user._doc.password);
        }).then(isValidPasword =>{
            if(!isValidPasword){
                throw new Error('Password is wrong')
            }
            return jwt.sign({useId : existingUser._id , email :  existingUser.email} , 'SECRETEKEY' , 
            {expiresIn : '1h'})
        }).then(token=>{
            return{
                userId : existingUser._id,
                token : token,
                expirationTime : 1
            }
        }).catch(err => {
            console.log(err)
        })
    }
}