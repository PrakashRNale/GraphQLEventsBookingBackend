const bcrypt = require('bcryptjs');

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
    }
}